// usePages.js
import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  sizeGroup: 9,
  currentPage: 1,
  filter: {
    category: null,
    species: null,
    brand: null,
  },
  dataId: {
    category: '',
    species: '',
    brand: '',
  },
  originalProducts: [],

  getTotalPages: () => {
    const { products, sizeGroup } = get();
    return Math.ceil(products.length / sizeGroup);
  },

  setFilter: (fill) =>
    set((state) => ({
      filter: {
        ...state.filter,
        [fill.name]: fill.value,
      },
    })),

  getFilter: () => {
    const { filter } = get();
    return filter;
  },

  setProducts: (products) => set({ products }),

  getProducts: () => {
    const { products } = get();
    return products;
  },

  setSizeGroup: (num) => set({ sizeGroup: num }),

  setCurrentPage: (page) => {
    const totalPages = get().getTotalPages();
    if (page - 1 <= totalPages && page - 1 >= 0) {
      set({ currentPage: page });
    }
  },

  getArrayPage: () => {
    const { products, sizeGroup, currentPage } = get();
    const currentPageIndex = currentPage - 1;
    const startIndex = currentPageIndex * sizeGroup;
    const endIndex = startIndex + sizeGroup;
    return products.slice(startIndex, endIndex);
  },

  getCurrentPage: () => {
    const { currentPage } = get();
    return currentPage;
  },

  setOriginalProducts: (products) => set({ originalProducts: [...products] }),

  resetFilters: () => set((state) => ({
    filter: {
      category: null,
      species: null,
      brand: null,
    },
  })),
  
}));

export const useOriginalProducts = () => {
  const originalProducts = useProductStore((state) => state.originalProducts);
  return originalProducts;
};

export const useCurrentPage = () => {
  const currentPage = useProductStore((state) => state.currentPage);
  return currentPage;
};
