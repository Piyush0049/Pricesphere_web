"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppDispatch } from "@/redux/store";
import { UserDataProps } from "@/types";
import { userData } from "@/redux/slices/userSlice";

export default function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDataProps | null;
}) {
  const dispatchRef = useRef<AppDispatch | null>(null);

  useEffect(() => {
    if (user) {
      if (!dispatchRef.current) {
        dispatchRef.current = store.dispatch;
      }
      dispatchRef.current(userData(user));
    }
  }, [user]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
