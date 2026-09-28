import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  AuthContext,
  authReducer,
  initialAuthState,
  type AuthState,
  type User,
} from "./authContext";

const STORAGE_KEY = "coffee-react-auth";

function loadInitialState(fallback: AuthState): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as { user: User; token: string };
    return {
      user: saved.user,
      token: saved.token,
      status: "authenticated",
      error: null,
    };
  } catch {
    return fallback;
  }
}

// Mock "server". Swap this function for a real API call later.
async function fakeLoginRequest(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (password !== "coffee123") {
    throw new Error("Invalid email or password");
  }
  return {
    user: { email, name: email.split("@")[0] },
    token: `mock-token-${crypto.randomUUID()}`,
  };
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialAuthState,
    loadInitialState
  );

  useEffect(() => {
    try {
      if (state.user && state.token) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ user: state.user, token: state.token })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage unavailable, ignore
    }
  }, [state.user, state.token]);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const result = await fakeLoginRequest(email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: result });
      return true;
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err instanceof Error ? err.message : "Login failed",
      });
      return false;
    }
  }, []);

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  const value = useMemo(
    () => ({ ...state, login, logout }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;