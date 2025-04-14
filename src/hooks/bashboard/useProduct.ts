import { useState, useEffect, useReducer } from "react";
import { productService } from "../../Services/product.service";
import { ProductFormData } from "../../interface/product";

type Action =
  | { type: "CHANGE_INPUT"; field: string; value: any }
  | { type: "ADD_IMAGES"; files: File[]; previews: string[] }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "REMOVE_EXISTING_IMAGE"; index: number }
  | { type: "ADD_EXISTING_IMAGE"; image: any; index: number };

const formReducer = (state: ProductFormData, action: Action): ProductFormData => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };

    case "ADD_IMAGES":
      const newFiles = action.files.filter(
        (file) =>
          !state.images.some((existing) =>
            typeof existing === "string"
              ? false
              : (existing as File).name === file.name
          )
      );
      const newPreviews = action.previews.slice(0, newFiles.length);
      return {
        ...state,
        images: [...state.images, ...newFiles],
        previews: [...(state.previews || []), ...newPreviews],
      };

    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_, index) => index !== action.index),
        previews: (state.previews || []).filter((_, index) => index !== action.index),
      };

    case "REMOVE_EXISTING_IMAGE":
      const deleted = state.existingImages?.[action.index];
      return {
        ...state,
        existingImages: state.existingImages?.filter((_, i) => i !== action.index) || [],
        deletedImages: [...(state.deletedImages || []), deleted],
      };

    case "ADD_EXISTING_IMAGE":
      const newExistingImages = [...(state.existingImages || [])];
      newExistingImages.splice(action.index, 0, action.image);
      return {
        ...state,
        existingImages: newExistingImages,
        deletedImages: state.deletedImages?.filter(img => img.id !== action.image.id) || [],
      };

    default:
      return state;
  }
};

const useProduct = ({ onSubmit, initialData, onClose }) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [formData, dispatch] = useReducer(formReducer, {
    id: initialData?.id || undefined,
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category_id: initialData?.category?.id || 0,
    brand: initialData?.brand || "",
    stock: initialData?.stock || 0,
    expirationDate: initialData?.expirationDate || "",
    available: initialData?.available ?? true,
    images: [],
    previews: [],
    existingImages: initialData?.images?.map((img: any) => ({
      id: img.id ? Number(img.id) : null,
      url: typeof img === 'string' ? img : img.url
    })) || [],
    deletedImages: [],
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      const data = response.status === 200 && response.data
        ? Array.isArray(response.data)
          ? response.data
          : response.data.data || []
        : [];
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al obtener productos");
      setSnackbar({
        open: true,
        message: "Error al obtener productos",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));
        const previews = compressedFiles.map((file) => URL.createObjectURL(file));
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
        setFieldErrors((prev) => ({ ...prev, images: "" }));
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
        setSnackbar({
          open: true,
          message: "Algunas imágenes no pudieron comprimirse",
          severity: "error"
        });
      }
    }
  };

  const removeImage = async (index: number, isExisting: boolean) => {
    try {
      if (isExisting) {
        const imageToRemove = formData.existingImages?.[index];
        
        if (!imageToRemove) {
          throw new Error("No se encontró la imagen a eliminar");
        }
  
        // Optimistic UI update
        dispatch({ type: "REMOVE_EXISTING_IMAGE", index });
        
        if (imageToRemove.id) {
          const result = await productService.deleteImage(imageToRemove.id);
          
          if (!result.success) {
            // Revertir si falla
            dispatch({ 
              type: "ADD_EXISTING_IMAGE", 
              image: imageToRemove, 
              index 
            });
            throw new Error(result.message);
          } else {
            // Actualizar UI para reflejar el cambio
            setSnackbar({
              open: true,
              message: "Imagen eliminada correctamente",
              severity: "success"
            });
          }
        }
      } else {
        dispatch({ type: "REMOVE_IMAGE", index });
      }
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Error al eliminar imagen",
        severity: "error"
      });
    }
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ ...formData });
      onClose();
      setSnackbar({
        open: true,
        message: "Producto guardado correctamente",
        severity: "success"
      });
    } catch (error) {
      setError("Hubo un error al guardar el producto. Inténtalo de nuevo.");
      setSnackbar({
        open: true,
        message: "Error al guardar el producto",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductFormData) => {
    setLoading(true);
    try {
      const response = await productService.createProduct(product);
      if (response.status === 201) {
        fetchProducts();
        setSnackbar({
          open: true,
          message: "Producto creado correctamente",
          severity: "success"
        });
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      setError("No se pudo crear el producto.");
      setSnackbar({
        open: true,
        message: "Error al crear producto",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, product: ProductFormData) => {
    setLoading(true);
    try {
      const response = await productService.updateProduct(id, product);
      if (response.status === 200) {
        fetchProducts();
        setSnackbar({
          open: true,
          message: "Producto actualizado correctamente",
          severity: "success"
        });
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError("No se pudo actualizar el producto.");
      setSnackbar({
        open: true,
        message: "Error al actualizar producto",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    formData,
    step,
    fieldErrors,
    snackbar,
    setSnackbar,
    createProduct,
    updateProduct,
    fetchProducts,
    handleChange,
    handleImageChange,
    removeImage,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
};

// Utilidad para comprimir imágenes (sin cambios)
export const compressImage = (file: File, maxSizeMB = 3, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No se pudo obtener el contexto del canvas."));

        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compress = (currentQuality: number) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedSizeMB = blob.size / (1024 * 1024);
              if (compressedSizeMB <= maxSizeMB || currentQuality <= 0.2) {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
              } else {
                compress(currentQuality - 0.1);
              }
            } else {
              reject(new Error("Error al comprimir la imagen."));
            }
          }, "image/jpeg", currentQuality);
        };

        compress(quality);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export default useProduct;