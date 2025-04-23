import { useState, useEffect, useReducer } from "react";
import { productService } from "../../Services/product.service";
import { ProductFormData, ProductImage, ProductIngredient } from "../../interface/product";

// Tipos para las props del hook
interface UseProductProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
  initialData?: Partial<ProductFormData>;
}

// Tipos para las acciones del reducer
type Action =
  | { type: "CHANGE_INPUT"; field: string; value: any }
  | { type: "ADD_INGREDIENT"; ingredient: ProductIngredient }
  | { type: "REMOVE_INGREDIENT"; index: number }
  | { type: "UPDATE_INGREDIENT"; index: number; ingredient: ProductIngredient }
  | { type: "ADD_IMAGES"; files: File[]; previews: string[] }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "REMOVE_EXISTING_IMAGE"; index: number };

const formReducer = (state: ProductFormData, action: Action): ProductFormData => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };

    case "ADD_INGREDIENT":
      return {
        ...state,
        data_table: [...(state.data_table || []), action.ingredient],
      };

    case "REMOVE_INGREDIENT":
      return {
        ...state,
        data_table: (state.data_table || []).filter((_, i) => i !== action.index),
      };

    case "UPDATE_INGREDIENT":
      const updatedIngredients = [...(state.data_table || [])];
      updatedIngredients[action.index] = action.ingredient;
      return {
        ...state,
        data_table: updatedIngredients,
      };

    case "ADD_IMAGES":
      const newFiles = action.files.filter(
        (file) => !state.images.some((existing) =>
          typeof existing === "string" ? false : (existing as File).name === file.name
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
        deletedImages: deleted ? [...(state.deletedImages || []), deleted] : state.deletedImages || [],
      };

    default:
      return state;
  }
};

const useProduct = ({ onSubmit, initialData, onClose }: UseProductProps) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const initialState: ProductFormData = {
    id: initialData?.id,
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
    existingImages: (initialData?.images || []) as unknown as ProductImage[],
    deletedImages: [],
    data_table: initialData?.data_table || [],
  };

  const [formData, dispatch] = useReducer(formReducer, initialState);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      const data = response.status === 200 && response.data
        ? Array.isArray(response.data)
          ? response.data
          : response.data.data || []
        : [];
      setProducts(data as ProductFormData[]);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    dispatch({ type: "CHANGE_INPUT", field: e.target.name, value: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));
        const previews = compressedFiles.map((file) => URL.createObjectURL(file));
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
        setFieldErrors((prev) => ({ ...prev, images: "" }));
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
      }
    }
  };

  const removeImage = async (index: number, isExisting: boolean): Promise<void> => {
    try {
      if (isExisting) {
        const imageToRemove = formData.existingImages?.[index];
        
        if (!imageToRemove) {
          throw new Error("No se encontró la imagen a eliminar");
        }
  
        const result = await productService.deleteImage(imageToRemove.id);
        if (!result.success) {
          throw new Error(result.message);
        }
        
        dispatch({ type: "REMOVE_EXISTING_IMAGE", index });
      } else {
        dispatch({ type: "REMOVE_IMAGE", index });
      }
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      setError(error instanceof Error ? error.message : "Error desconocido al eliminar imagen");
    }
  };

  const handleNextStep = (): void => setStep((prev) => prev + 1);
  const handlePrevStep = (): void => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try { 
      await onSubmit({ ...formData });
      onClose();
    } catch (error) {
      setError("Hubo un error al guardar el producto. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductFormData): Promise<void> => {
    setLoading(true);
    try {
      const response = await productService.createProduct(product);
      if (response.status === 201) fetchProducts();
    } catch (error) {
      console.error("Error al crear producto:", error);
      setError("No se pudo crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, product: ProductFormData): Promise<void> => {
    setLoading(true);
    try {
      const response = await productService.updateProduct(id, product);
      if (response.status === 200) fetchProducts();
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
    formData,
    step,
    fieldErrors,
    dispatch,
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

const compressImage = (file: File, maxSizeMB = 3, quality = 0.8): Promise<File> => {
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