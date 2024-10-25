import { createStore } from "zustand";
import getUnreadCount from "@/app/actions/getUnreadCount";

const defaultInitState = {
  unreadCount: 0,
};

export const createMsgStore = (initState = defaultInitState) => {
  return createStore((set) => ({
    ...initState,
    setUnreadCount: async () => {
      const { count } = await getUnreadCount();
      set({ unreadCount: count });
    },
    incrementUnreadCount: () =>
      set((state) => ({ unreadCount: state.unreadCount + 1 })),
    decrementUnreadCount: () =>
      set((state) => ({
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0,
      })),
  }));
};
