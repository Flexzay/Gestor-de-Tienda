import { useState, useEffect, useReducer } from "react";
import { productService } from "../../Services/product.service";
import { ProductFormData, ProductImage } from "../../interface/product";

type Action =
  | { type: "CHANGE_INPUT"; field: string; value: any }
  | { type: "UPDATE_INGREDIENT"; index: number; field: 'name' | 'quantity'; value: string }
  | { type: "ADD_INGREDIENT" }
  | { type: "REMOVE_INGREDIENT"; index: number }
  | { type: "TOGGLE_AVAILABLE" }
  | { type: "ADD_IMAGES"; files: File[]; previews: string[] }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "REMOVE_EXISTING_IMAGE"; index: number }
  | { type: "RESET_FORM"; initialState: ProductFormData };

const formReducer = (state: ProductFormData, action: Action): ProductFormData => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.value };

    case "UPDATE_INGREDIENT":
      const updatedIngredients = [...(state.ingredients || [])];
      updatedIngredients[action.index] = {
        ...updatedIngredients[action.index],
        [action.field]: action.value
      };
      return {
        ...state,
        ingredients: updatedIngredients
      };
      
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...(state.ingredients || []), { name: "", quantity: "" }]
      };
      
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: (state.ingredients || []).filter((_, i) => i !== action.index)
      };
      
    case "TOGGLE_AVAILABLE":
      return {
        ...state,
        available: !state.available
      };

    case "ADD_IMAGES":
      const newFiles = action.files.filter(
        (file) => !state.images.some((existing) =>
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

    case "RESET_FORM":
      return { ...action.initialState };

    default:
      return state;
  }
};

interface UseProductOptions {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
  initialData?: ProductFormData;
}

const useProduct = ({ onSubmit, onClose, initialData }: UseProductOptions) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const initialState: ProductFormData = {
    id: initialData?.id || undefined,
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category_id: initialData?.category?.id || 0,
    brand: initialData?.brand || "",
    stock: initialData?.stock || 0,
    expirationDate: initialData?.expirationDate || "",
    available: initialData?.available ?? true,
    ingredients: initialData?.ingredients || [],
    images: [],
    previews: [],
    existingImages: initialData?.images?.map((img: any) => ({
      id: img.id ? Number(img.id) : null,
      url: typeof img === 'string' ? img : img.url
    })) || [],
    deletedImages: [],
  };

  const [formData, dispatch] = useReducer(formReducer, initialState);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      if (response.status === 200 && response.data) {
        setProducts(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM", initialState });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    dispatch({
      type: "CHANGE_INPUT",
      field: name,
      value: type === 'checkbox' ? checked : value
    });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const updateIngredient = (index: number, field: 'name' | 'quantity', value: string) => {
    dispatch({ type: "UPDATE_INGREDIENT", index, field, value });
  };

  const addIngredient = () => {
    dispatch({ type: "ADD_INGREDIENT" });
  };

  const removeIngredient = (index: number) => {
    dispatch({ type: "REMOVE_INGREDIENT", index });
  };

  const toggleAvailable = () => {
    dispatch({ type: "TOGGLE_AVAILABLE" });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      try {
        const compressedFiles = await Promise.all(files.map(compressImage));
        const previews = compressedFiles.map((file) => URL.createObjectURL(file));
        dispatch({ type: "ADD_IMAGES", files: compressedFiles, previews });
        setFieldErrors((prev) => ({ ...prev, images: "" }));
      } catch (error) {
        setError("Algunas imágenes no pudieron comprimirse.");
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
  
        if (imageToRemove.id) {
          const result = await productService.deleteImage(imageToRemove.id);
          if (!result.success) {
            throw new Error(result.message);
          }
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

  const handleNextStep = () => {
    // Validación antes de avanzar
    const errors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.name.trim()) errors.name = "Nombre es requerido";
      if (!formData.description.trim()) errors.description = "Descripción es requerida";
      if (formData.price <= 0) errors.price = "Precio debe ser mayor a 0";
      if (!formData.category_id) errors.category_id = "Selecciona una categoría";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validación final
      if (formData.previews.length === 0 && formData.existingImages?.length === 0) {
        setFieldErrors({ images: "Debes subir al menos una imagen" });
        return;
      }

      await onSubmit(formData);
      await fetchProducts();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setError("Hubo un error al guardar el producto");
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
    fetchProducts,
    handleChange,
    updateIngredient,
    addIngredient,
    removeIngredient,
    toggleAvailable,
    handleImageChange,
    removeImage,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    resetForm
  };
};

// Función para comprimir imágenes
const compressImage = async (file: File, maxSizeMB = 3, quality = 0.8): Promise<File> => {
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