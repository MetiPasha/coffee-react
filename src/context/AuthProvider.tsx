import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { AuthContext, authReducer, initialAuthState } from "./authContext";
import type { User } from "./authContext";

async function loginRequest(email: string, password: string): Promise<User> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data.user as User;
}

async function meRequest(): Promise<User | null> {
  const res = await fetch("/api/me", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user as User | null;
}

async function logoutRequest(): Promise<void> {
  await fetch("/api/logout", { method: "POST", credentials: "include" });
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    meRequest().then((user) => {
      if (user) dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await loginRequest(email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
      return true;
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err instanceof Error ? err.message : "Login failed",
      });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = useMemo(
    () => ({ ...state, login, logout }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;