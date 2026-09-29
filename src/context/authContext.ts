import { createContext } from "react";

export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

export const initialAuthState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, status: "loading", error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload.user, status: "authenticated", error: null };
    case "LOGIN_FAILURE":
      return { ...initialAuthState, status: "error", error: action.payload };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);