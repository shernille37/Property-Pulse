"use client";

import { createContext, useRef, useContext, Children } from "react";
import { useStore } from "zustand";

import { createMsgStore } from "@/stores/MessageStore";

const MessageStoreContext = createContext(undefined);

export const MessageStoreProvider = ({ children }) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = createMsgStore();
  }

  return (
    <MessageStoreContext.Provider value={storeRef.current}>
      {children}
    </MessageStoreContext.Provider>
  );
};

export const useMessageStore = (selector) => {
  const messageStoreContext = useContext(MessageStoreContext);

  if (!messageStoreContext) {
    throw new Error("useMessageStore must be used within MessageStoreProvider");
  }

  return useStore(messageStoreContext, selector);
};
