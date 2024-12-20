// ./src/contexts/AuthContext.tsx
//
// Auth context providing NextJS client router,
// Firebase Auth state (with loading and error),
// and Firestore user blacklist state (with loading and error).

// Explicitly declare as a NextJS client-only component.
"use client";

// NextJS, Firebase Auth, and Firestore essentail imports.
import type { AuthError, User } from "firebase/auth";
import {
  type DocumentData,
  type FirestoreError,
  type Query,
  collection,
  query,
  where,
} from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firehooks/auth";
import { useQuery } from "react-firehooks/firestore";

// Local Fireabse Auth and Firestore imports.
import { fbAuth, fbStore } from "@lib/firebaseClientApp";

// Local provider props interface import.
import type { ProviderProps } from "@contexts/ProviderProps";

// Local email hash utility import.
import hashEmailToSha256 from "@utils/hashEmailToSha256";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface AuthContextProps {

  // NextJS client router and pathname.
  clientRouter      : ReturnType<typeof useRouter>;
  pathname          : string;

  // Firebase Auth state.
  user              : User | undefined;

  // Firestore user blacklist state.
  isBlacklisted     : boolean;

  // Auth context loading and error state.
  authContextLoading: boolean;
  authContextError  : AuthError | FirestoreError | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// -----------------------------------------------------------------------------
export function AuthProvider({
  LoadingComponent,
  ErrorComponent,
  children,
}: ProviderProps): JSX.Element {
  // ---------------------------------------------------------------------------
  // NextJS client router.
  const clientRouter = useRouter();

  // NextJS client pathname.
  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Firebase Auth state with error handling.
  const [user, loadingUser, errorUser] = useAuthState(fbAuth);

  useEffect(() => {
    if (errorUser) {
      console.error(
        `AuthProvider error at "AuthContext"'s "useAuthState" for user: "${user?.uid}"`,
        errorUser,
      );
    }
  }, [errorUser]);

  // ---------------------------------------------------------------------------
  // Firestore user blacklist state with error handling
  const [userBlacklistQuery, setUserBlacklistQuery] = useState<
    Query<DocumentData> | undefined
  >(undefined);

  useEffect(() => {
    if (!loadingUser && !errorUser && user && user.email) {
      const hashedEmail: string = hashEmailToSha256(user.email);
      setUserBlacklistQuery(
        query(
          collection(fbStore, "blacklist"),
          where("__name__", "==", hashedEmail),
        ),
      );
    } else {
      setUserBlacklistQuery(undefined);
    }
  }, [loadingUser, errorUser, user]);

  const [blacklistQuerySnapshot, loadingBlacklist, errorBlacklist] =
    useQuery(userBlacklistQuery);

  useEffect(() => {
    if (errorBlacklist) {
      console.error(
        `AuthProvider error at "AuthContext"'s "useQuery" for user: "${user?.uid}" with query: "${userBlacklistQuery}"`,
        errorBlacklist,
      );
    }
  }, [errorBlacklist]);

  // ---------------------------------------------------------------------------
  // Memoize auth context value.
  const authContextValue = useMemo(
    () =>
      (
      // biome-ignore format: added alignment for clarity.
      {
        clientRouter,
        pathname,
        user              : user?.uid ? user : undefined,
        isBlacklisted     : 
          !loadingBlacklist && 
          !errorBlacklist &&
          !!blacklistQuerySnapshot &&
          !blacklistQuerySnapshot.empty,
        authContextLoading: loadingUser || loadingBlacklist,
        authContextError  : errorUser || errorBlacklist,
    }),
    [
      clientRouter,
      pathname,
      user,
      blacklistQuerySnapshot,
      loadingUser,
      loadingBlacklist,
      errorUser,
      errorBlacklist,
    ],
  );

  // ---------------------------------------------------------------------------
  // Render loading component when loading user or blacklist state.
  if (loadingUser || loadingBlacklist) {
    return <LoadingComponent />;
  }

  // Render error component when error user or blacklist state.
  if (errorUser || errorBlacklist) {
    return <ErrorComponent />;
  }

  // ---------------------------------------------------------------------------
  // Return auth context provider with children.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// -----------------------------------------------------------------------------
export function useAuthContext(): AuthContextProps {
  const context: AuthContextProps | undefined = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      `useAuthContext returns "undefined". Make sure the calling component is a children of <AuthProvider>.`,
    );
  }
  return context;
}
