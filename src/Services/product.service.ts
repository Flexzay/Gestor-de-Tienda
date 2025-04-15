import { environment } from "../config/environmet";
import { storageService } from "../Services/storage.service";
import { ProductFormData, ProductImage } from "../interface/product";

const API_URL = `${environment.baseUrl}/product`;
const S3_BUCKET_URL = environment.s3Storage;

export const productService = {
  /**
   * Subir imágenes a S3 antes de asociarlas al producto
   */
  async uploadImages(productId: string | number, files: File[]): Promise<{ id: number, url: string }[]> {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const uploadedImages: { id: number, url: string }[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${API_URL}/images/${productId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error al subir la imagen: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.data?.path) {
          throw new Error("La API no devolvió una ruta válida para la imagen.");
        }

        uploadedImages.push({
          id: data.data.id,
          url: `${S3_BUCKET_URL}${data.data.path}`,
        });
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      return [];
    }
  },

  /**
   * Crear un nuevo producto
   */
  async createProduct(productData: ProductFormData) {
    const token = storageService.getToken();
    const shopId = storageService.getShopId();

    if (!token || !shopId) {
      throw new Error("Authentication required: Missing token or shopId");
    }

    try {
      // 1. Preparar los datos para el producto principal
      const productPayload = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category_id: productData.category_id,
        available: productData.available,
        brand: productData.brand || null,
        stock: productData.stock || 0,
        expirationDate: productData.expirationDate || null,
        data_table: productData.data_table?.map(ingredient => ({
          item: ingredient.item,
          value: ingredient.value
        })) || []
      };

      console.log("Creating product with payload:", productPayload);

      // 2. Crear el producto principal
      const createResponse = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to create product: ${createResponse.statusText}`);
      }

      const createdProduct = await createResponse.json();
      console.log("Product created successfully:", createdProduct);

      // 3. Manejar las imágenes si existen
      if (productData.images && productData.images.length > 0) {
        try {
          const filesToUpload = productData.images.filter(img => img instanceof File) as File[];
          
          if (filesToUpload.length > 0) {
            console.log("Uploading product images...");
            const uploadedImages = await this.uploadImages(createdProduct.data.id, filesToUpload);
            console.log("Images uploaded successfully:", uploadedImages);
            
            // Actualizar el producto con las nuevas imágenes
            createdProduct.data.images = [
              ...(productData.existingImages || []),
              ...uploadedImages
            ];
          }
         } catch (uploadError) {
          console.error("Error uploading images, but product was created:", uploadError);
          // Continuar aunque falle la subida de imágenes
        }
      }

      return {
        success: true,
        status: createResponse.status,
        data: createdProduct.data,
        message: "Product created successfully"
      };

    } catch (error) {
      console.error("Error in createProduct service:", error);
      return {
        success: false,
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error occurred while creating product",
        error: error
      };
    }
  },

  /**
   * Obtener todos los productos
   */
  async getProducts() {
    try {
      const token = storageService.getToken();
      const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
      const shopId = shop.id;
  
      if (!token || !shopId) {
        throw new Error("Falta el token o el shop_id.");
      }
  
      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }
  
      const processedData = data.data.map((product: any) => ({
        ...product,
        images: product.images?.length
          ? product.images.map((img: any) => ({
              id: img.id, 
              url: `${S3_BUCKET_URL}${img.path}`,
              path: img.path
            }))
          : [],
        category: product.category || {
          id: product.category_id,
          name: product.category_name || "Sin categoría",
          count_products: product.category_count
        },
        data_table: product.data_table || []
        
      }));
  
      console.log("📦 Productos obtenidos:", processedData); // 👈 Aquí el log
  
      return {
        status: response.status,
        data: processedData,
      };
    } catch (error: any) {
      console.error("Error obteniendo productos:", error);
      return {
        status: 500,
        message: error.message || "Error al obtener productos"
      };
    }
  },
  

  /**
   * Actualizar un producto
   */
  async updateProduct(productId: string | number, productData: ProductFormData) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      // 1. Eliminar imágenes marcadas como borradas
      const deleted = productData.deletedImages || [];
      for (const img of deleted) {
        if (img?.id) await this.deleteImage(img.id);
      }

      // 2. Actualizar producto base
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category_id: productData.category_id,
          available: productData.available,
          brand: productData.brand,
          stock: productData.stock,
          expirationDate: productData.expirationDate,
          data_table: productData.data_table?.map(ingredient => ({
            item: ingredient.item,
            value: ingredient.value
          })) || []
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto.");

      // 3. Subir nuevas imágenes
      const filesToUpload = productData.images.filter((img) => img instanceof File) as File[];
      let uploadedImages: ProductImage[] = [];

      if (filesToUpload.length) {
        uploadedImages = await this.uploadImages(productId, filesToUpload);
      }

      const finalImages: ProductImage[] = [
        ...(productData.existingImages?.filter(img => !deleted.find(d => d.id === img.id)) || []),
        ...uploadedImages
      ];

      return {
        status: 200,
        data: {
          ...productData,
          id: productId,
          images: finalImages,
          category: productData.category || {
            id: productData.category_id,
            name: "",
          }
        }
      };
    } catch (error: any) {
      console.error("Error actualizando producto:", error);
      return {
        status: 500,
        message: error.message || "Error al actualizar producto"
      };
    }
  },


  /**
   * Obtener detalles de un producto
   */
  async getProductById(productId: string | number) {
    try {
      const token = storageService.getToken();
      const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
      const shopId = shop.id;
      if (!token || !shopId) throw new Error("Falta el token o el shop_id.");

      const response = await fetch(`${environment.baseUrl}/shop/${shopId}/product/detail/${productId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, data };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al obtener el producto" };
    }
  },

  /**
   * Eliminar una imagen de un producto
   */
  async deleteImage(imageId: number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");
  
      const response = await fetch(`${environment.baseUrl}/product/images/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
  
      // Si la respuesta es exitosa pero no tiene contenido
      if (response.status === 204 || response.status === 200) {
        return { 
          success: true, 
          message: "Imagen eliminada correctamente" 
        };
      }
  
      // Si hay contenido, intentar parsearlo
      try {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Error ${response.status}`);
        }
        return { success: true, message: "Imagen eliminada correctamente", data };
      } catch (e) {
        // Si falla el JSON pero la respuesta fue exitosa
        if (response.ok) {
          return { success: true, message: "Imagen eliminada correctamente" };
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Error en deleteImage:", error);
      return {
        success: false,
        message: error.message || "Error al eliminar la imagen"
      };
    }
  },

  /**
   * Guardar precios de un producto
   */
  async savePrices(productId: string | number, prices: any) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/price/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prices),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return { status: response.status, message: "Precios guardados con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al guardar precios" };
    }
  },

  /**
   * Eliminar un precio de un producto
   */
  async deletePrice(priceId: string | number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/price/${priceId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return { status: response.status, message: "Precio eliminado con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al eliminar el precio" };
    }
  },
};
