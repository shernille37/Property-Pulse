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
  }));
};
