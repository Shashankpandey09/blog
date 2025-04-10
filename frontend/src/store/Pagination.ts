import { create } from "zustand";
import { BlogStore } from "./Blogs";

interface paginationStore {
  currentPage: number;
  totalPage: number;
  hasPrev_Page: boolean | null;
  hasNext_Page: boolean | null;
  next_Page: () => void;
  prev_page: () => void;
  setCurrent_page: (current: number) => void;
}

export const PageStore = create<paginationStore>((set, get) => ({
  currentPage: 1,
  totalPage: 0,
  hasPrev_Page: null,
  hasNext_Page: null,
  next_Page: () => {
    const { hasNext_Page } = get();
    if (hasNext_Page) {
      set((state) => ({ currentPage: state.currentPage + 1 }));
      BlogStore.getState().invalidate();
    }
    
  },
  prev_page: () => {
    const { hasPrev_Page } = get();
    if (hasPrev_Page) {
      set((state) => ({ currentPage: state.currentPage - 1 }));
      BlogStore.getState().invalidate();
    }
  },
  setCurrent_page: (current) => {
    set({ currentPage: current });
    BlogStore.getState().invalidate();
  },
}));
