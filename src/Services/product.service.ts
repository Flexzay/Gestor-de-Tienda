import { environment } from "../config/environmet";
import { storageService } from "../Services/storage.service";
import { ProductFormData } from "../interface/product";

const API_URL = `${environment.baseUrl}/product`;
const S3_BUCKET_URL = environment.s3Storage; // URL base de S3

export const productService = {
  /**
   * Subir imágenes a S3 antes de asociarlas al producto
   */
  async uploadImages(productId: string | number, files: File[]) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const uploadedImages = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${API_URL}/images/${productId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) throw new Error(`Error al subir la imagen: ${response.statusText}`);

        const data = await response.json();
        if (!data.data?.path) throw new Error("La API no devolvió una ruta válida para la imagen.");

        uploadedImages.push(`${S3_BUCKET_URL}${data.data.path}`);
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      return [];
    }
  },


  /**
   * Crear un nuevo producto
   */

  async createProduct(productData: any) {
    try {
      const token = storageService.getToken();
      const shop = JSON.parse(localStorage.getItem("shop_data") || "{}");
      const shopId = shop.id;
      if (!token || !shopId) throw new Error("Falta el token o el shop_id.");


      // 📌 1️⃣ Crear el producto sin imágenes
      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "POST",
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
        }),
      });

      if (!response.ok) throw new Error("Error al crear el producto.");

      const createdProduct = await response.json();

      // 📌 2️⃣ Subir imágenes después de crear el producto
      let imageUrls: string[] = [];
      if (productData.images?.length) {
        imageUrls = await productService.uploadImages(createdProduct.data.id, productData.images);
      }

      return {
        status: response.status,
        data: { ...createdProduct.data, images: imageUrls },
      };
    } catch (error) {
      console.error("Error al crear producto:", error);
      return { status: 500, message: "Error al crear el producto" };
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
      if (!token || !shopId) throw new Error("Falta el token o el shop_id.");


      const response = await fetch(`${API_URL}/${shopId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Error ${response.status}`);

      return {
        status: response.status,
        data: data.data.map((product: any) => ({
          ...product,
          images: product.images?.length ? product.images.map((img: any) => `${S3_BUCKET_URL}${img.path}`) : [],
        })),
      };
    } catch (error: any) {
      console.error("Error al obtener productos:", error);
      return { status: 500, message: error.message || "Error al obtener productos" };
    }
  },


  /**
   * Actualizar un producto
   */

  async updateProduct(productId: string | number, productData: ProductFormData) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      console.log("🔄 Actualizando producto...");

      // 1️⃣ Actualizar los datos básicos del producto (sin imágenes)
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
          category_id: productData.category,
          available: productData.available,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto.");

      let imageUrls: string[] = [];
      if (productData.images && productData.images.length) {
        console.log("🖼️ Subiendo nuevas imágenes...");
        imageUrls = await productService.uploadImages(productId, productData.images);
      }

      return { status: 200, data: { ...productData, images: imageUrls } };
    } catch (error: any) {
      console.error("❌ Error al actualizar producto:", error);
      return { status: 500, message: error.message || "Error al actualizar producto" };
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
  async deleteImage(imageId: string | number) {
    try {
      const token = storageService.getToken();
      if (!token) throw new Error("No hay un token válido.");

      const response = await fetch(`${API_URL}/images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      return { status: response.status, message: "Imagen eliminada con éxito" };
    } catch (error: any) {
      return { status: 500, message: error.message || "Error al eliminar la imagen" };
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
