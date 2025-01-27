import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContext {
    token?: string,
    expires?: Date | string
}

export const AuthContext = createContext<AuthContext>({
    token: undefined,
    expires: undefined
});

export function AuthProvider ({children}: Readonly<{children: ReactNode}>) {
    const [session, setSession] = useState<undefined | AuthContext>(undefined);

    function login (session: AuthContext) {
        setSession(session);

        return session
    }

    function logout () {
        setSession(undefined);
    }

    useEffect(() => {
        // On app load, check for an existing session
        const fetchUser = async () => {
          const response = await fetch('/api/validate-session', {
            credentials: 'include', // Include cookies
          });
          if (response.ok) {
            const userData = await response.json();
            login(userData);
          }
        };
        fetchUser();
      }, []);

    return (
        <AuthContext.Provider value={{token: undefined, expires: undefined}}>
            {children}
        </AuthContext.Provider>
    )
}