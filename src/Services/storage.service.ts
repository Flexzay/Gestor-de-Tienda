export const storageService = {
  // ✅ Guardar token
  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  },

  // ✅ Guardar y obtener TODOS los datos de la tienda
  setShopData(shopData: any) {
    localStorage.setItem("shop_data", JSON.stringify(shopData));
    console.log("shop_data", shopData);
  },

  getShopData(): any | null {
    const data = localStorage.getItem("shop_data");
    return data ? JSON.parse(data) : null;
  },

  removeShopData() {
    localStorage.removeItem("shop_data");
  },

  // ✅ Nuevo método para obtener el shopId
  getShopId(): string | null {
    const shopData = this.getShopData();
    return shopData?.id || null;
  }
};
