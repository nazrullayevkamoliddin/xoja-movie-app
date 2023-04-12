import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useMemo, useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";
import { useAuth } from "src/hooks/useAuth";
import Loader from "src/loader/loader";
interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const { error, signUp, signIn, isLoading, user, logout, setUser, setIsLoading } = useAuth();

  const value = useMemo(
    () => ({
      user,
      isLoading,
      logout,
      signIn,
      error,
      signUp,
    }),
    // eslint-disable-next-line
    [user, isLoading, error]
  );

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setIsLoading(false)
        setInitialLoader(false);

      }),
      // eslint-disable-next-line
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : <Loader/>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
