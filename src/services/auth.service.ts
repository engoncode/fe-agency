import api from "./api";

// Tipe data untuk payload login
interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  login: (credentials: LoginCredentials) => {
    return api.post("/login", credentials);
  },
};
