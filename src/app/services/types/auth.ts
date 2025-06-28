export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | string; // add more roles as needed
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
