export const storageService = {
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

  //  Guardar y obtener `shop_id`
  setShopId(shopId: string) {
    localStorage.setItem("shop_id", shopId);
  },

  getShopId(): string | null {
    return localStorage.getItem("shop_id");
  },

  removeShopId() {
    localStorage.removeItem("shop_id");
  }
};
