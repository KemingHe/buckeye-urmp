// ./src/context/UserContext.tsx
//
// User context providing Firestore user document reference,
// user document state (with loading and error),
// and Firestore user waitlist state (with loading and error).
// Uses useAuthContext. Must be nested inside AuthProvider.

// Explicitly declare as a NextJS client-only component.
"use client";

import {
  type DocumentData,
  type DocumentReference,
  type FirestoreError,
  doc,
} from "firebase/firestore";
// NextJS and Firestore essential imports.
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDocumentData } from "react-firehooks/firestore";

// Local Firestore imports.
import { fbStore } from "@lib/firebaseClientApp";

// Local auth context import.
import { useAuthContext } from "@contexts/AuthContext";

// Local provider props interface import.
import type { ProviderProps } from "@contexts/ProviderProps";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface UserContextProps {

  // Firestore user document reference.
  userDocRef        : DocumentReference<DocumentData> | undefined;
  
  // Firestore user document state.
  userData          : DocumentData | undefined;

  // Firestore user waitlist state.
  isWaitlisted      : boolean;

  // User context loading and error state.
  userContextLoading: boolean;
  userContextError  : FirestoreError | undefined;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// -----------------------------------------------------------------------------
export function UserProvider({
  LoadingComponent,
  ErrorComponent,
  children,
}: ProviderProps): JSX.Element {
  // ---------------------------------------------------------------------------
  // Auth context state.
  const { user, authContextLoading, authContextError } = useAuthContext();

  // ---------------------------------------------------------------------------
  // Firestore user document state with error handling.
  const [userDocRef, setUserDocRef] = useState<
    DocumentReference<DocumentData> | undefined
  >(undefined);

  useEffect(() => {
    if (user && !authContextLoading && !authContextError) {
      setUserDocRef(doc(fbStore, "users", user.uid));
    } else {
      setUserDocRef(undefined);
    }
  }, [authContextLoading, authContextError, user]);

  const [userData, loadingUserData, errorUserData] =
    useDocumentData(userDocRef);

  useEffect(() => {
    if (errorUserData) {
      console.error(
        `UserProvider error at useDocumentData for user: "${user?.uid}" with doc ref: "${userDocRef?.path}"`,
        errorUserData,
      );
    }
  }, [errorUserData]);

  // ---------------------------------------------------------------------------
  // Firestore user waitlist state with error handling.
  const [userWaitlistRef, setUserWaitlistRef] = useState<
    DocumentReference<DocumentData> | undefined
  >(undefined);

  useEffect(() => {
    if (user && !authContextLoading && !authContextError) {
      setUserWaitlistRef(doc(fbStore, "waitlist", user.uid));
    } else {
      setUserWaitlistRef(undefined);
    }
  }, [authContextLoading, authContextError, user]);

  const [waitlistData, loadingWaitlist, errorWaitlist] =
    useDocumentData(userWaitlistRef);

  useEffect(() => {
    if (errorWaitlist) {
      console.error(
        `UserProvider error at useDocumentData for user: "${user?.uid}" with doc ref: "${userWaitlistRef?.path}"`,
        errorWaitlist,
      );
    }
  }, [errorWaitlist]);

  // ---------------------------------------------------------------------------
  // Memoize user context value.
  const userContextValue = useMemo(
    () =>
      (
      // biome-ignore format: added alignment for clarity.
      {
        userDocRef,
        userData,
        isWaitlisted      : !!waitlistData && !loadingWaitlist && !errorWaitlist,
        userContextLoading: loadingUserData || loadingWaitlist,
        userContextError  : errorUserData || errorWaitlist,
    }),
    [
      userDocRef,
      userData,
      waitlistData,
      loadingUserData,
      loadingWaitlist,
      errorUserData,
      errorWaitlist,
    ],
  );

  // ---------------------------------------------------------------------------
  // Render loading component when loading user or waitlist state.
  if (authContextLoading || loadingUserData || loadingWaitlist) {
    return <LoadingComponent />;
  }

  // Render error component when error in user or waitlist state.
  if (authContextError || errorUserData || errorWaitlist) {
    return <ErrorComponent />;
  }

  // ---------------------------------------------------------------------------
  // Return user context provider with children.
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

// -----------------------------------------------------------------------------
export function useUserContext(): UserContextProps {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      `useUserContext returns "undefined". Make sure the calling component is a children of <UserProvider>.`,
    );
  }
  return context;
}
