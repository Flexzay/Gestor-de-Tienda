import { useState, useEffect, useReducer } from "react";
import { productService } from "../../Services/product.service";
import { ProductFormData } from "../../interface/product";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };
    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.files],
        previews: [...state.previews, ...action.previews],
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_img: any, index: number) => index !== action.index),
        previews: state.previews.filter((_preview: any, index: number) => index !== action.index),
      };
      case "REMOVE_EXISTING_IMAGE":
        return {
          ...state,
          existingImages: state.existingImages.filter((_, index) => index !== action.index),
          deletedImages: [...(state.deletedImages || []), state.existingImages[action.index]],
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

  const [formData, dispatch] = useReducer(formReducer, {
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category_id: initialData?.category?.id || "",
    available: initialData?.available ?? true,
    images: [],
    previews: initialData?.images?.length ? initialData.images : [],
    existingImages: initialData?.images?.map((img: any) => 
      typeof img === 'string' 
        ? { id: null, url: img } 
        : { id: Number(img.id), url: img.url }
    ) || []
    

  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.status === 200 && response.data ? (Array.isArray(response.data) ? response.data : response.data.data || []) : []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map(file => compressImage(file)));
        const previews = compressedFiles.map(file => URL.createObjectURL(file));
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
        setFieldErrors((prev) => ({ ...prev, images: "" }));
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
      }
    }
  };

  const removeImage = async (index: number, isExisting: boolean) => {
    if (isExisting && formData.existingImages) {
      const imageToDelete = formData.existingImages[index];
  
      // Verificar que el ID es numérico antes de hacer la petición
      if (imageToDelete?.id && !isNaN(Number(imageToDelete.id))) {
        try {
          console.log(`🛠️ Eliminando imagen con ID: ${imageToDelete.id}`);
          await productService.deleteImage(imageToDelete.id); 
        } catch (error) {
          console.error(`❌ Error eliminando imagen:`, error);
        }
      } else {
        console.error("❌ No se encontró un ID válido para la imagen.");
      }
    } else {
      dispatch({ type: "REMOVE_IMAGE", index });
    }
  };
  
  
  

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      onSubmit(formData);
      onClose();
    } catch (error) {
      setError("Hubo un error al guardar el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductFormData) => {
    setLoading(true);
    try {
      const response = await productService.createProduct(product);
      if (response.status === 201) {
        fetchProducts(); // Actualizar lista después de crear un producto
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      setError("No se pudo crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, product: ProductFormData) => {
    setLoading(true);
    try {
      const response = await productService.updateProduct(id, product);
      if (response.status === 200) {
        fetchProducts(); // Actualizar lista después de editar un producto
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError("No se pudo actualizar el producto.");
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
    fetchProducts,
    formData,
    step,
    fieldErrors,
    createProduct,
    updateProduct,
    handleChange,
    handleImageChange,
    removeImage,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
};

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
