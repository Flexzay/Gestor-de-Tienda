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
  };
  