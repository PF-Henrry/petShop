import { create } from "zustand";

const storedCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart")) || []
    : [];
const storedFavorites = [];

export const useProductStore = create((set, get) => ({
  products: [],

  cartProducts: storedCart.map((product) => ({
    ...product,
    deliveryMethod: "Retiro en tienda", 
   
  })),

  sizeGroup: 9,
  currentPage: 1,
  filter: {
    category: null,
    species: null,
    brand: null,
  },
  dataId: {
    category: "",
    species: "",
    brand: "",
  },
  originalProducts: [],
  favorites: storedFavorites,
  order: {
    orderID: null,
    status: null,
  },
  sortOrder: "desc",

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

  setProducts: (products) => {
    localStorage.setItem("products", JSON.stringify([...products]));
    console.log('esto se guarda en products',products)
    set({ products })
  },

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

  setSortOrder: (order) => set({ sortOrder: order }),

  sortProducts: () => {
    const { products, sortOrder } = get();
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "desc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    set({ products: sortedProducts });
    return sortedProducts;
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

  resetFilters: () =>
    set((state) => ({
      filter: {
        category: null,
        species: null,
        brand: null,
      },
    })),

    addToCart: (product) => {
      
      set((state) => {
        const existingProduct = state.cartProducts.find(
          (p) => p.id === product.id
        );
    
        if (existingProduct) {
          // Si el producto ya está en el carrito, actualiza la cantidad
          const updatedCart = state.cartProducts.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + 1, stock: product.stock, active: product.active }
              : p
          );
        
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return { cartProducts: updatedCart };
        } else {
          // Si el producto no está en el carrito, agrégalo con cantidad 1
          const updatedCart = [
            ...state.cartProducts,
            { ...product, quantity: 1, stock: product.stock, active: product.active }
          ];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return { cartProducts: updatedCart };
        }
      });
    },

    

  removeFromCart: (products) => {
    set((state) => {
      const updatedCart = state.cartProducts.filter(
        (p) => p.id !== products.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cartProducts: updatedCart };
    });
  },

  updateQuantity: (products, newQuantity) => {
    set((state) => {
      const updatedCart = state.cartProducts.map((p) =>
        p.id === products.id ? { ...p, quantity: newQuantity } : p
      );
      return { cartProducts: updatedCart };
    });
  },
updateDeliveryMethod: (productId, newDeliveryMethod) => {
    set((state) => {
      const updatedCart = state.cartProducts.map((product) =>
        product.id === productId
          ? { ...product, deliveryMethod: newDeliveryMethod }
          : product
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cartProducts: updatedCart };
    });
  },

  addToFavorites: (productId,userid) => {
    set((state) => {
      const findProduct = state.products.find((product) => {
        return product._id == productId});
      const updatedFavorites = [...state.favorites, findProduct];
      
      const fetchingFavorite = async() => {
        
        const response = await fetch(`api/favorite/${userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({productId})
        });
        
        console.log(await response.json())

      }
      fetchingFavorite();

      return { favorites: updatedFavorites };
    });
  },

  removeFromFavorites: (productId,userid) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((product) => product._id !== productId);
      const fetchingFavorite = async() => {

        const response = await fetch(`api/favorite/${userid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({productId})
        });

        console.log(await response.json())
      }
      fetchingFavorite();

      return { favorites: updatedFavorites };
    });
  },

  getFavorites: () => {
    const { favorites } = get();
    return favorites;
  },
  updateFavorites: (userid) => {
     const fetching = async () => {
        const response = await fetch(`api/favorite/${userid}`)
        if(response.ok){
          const datos = await response.json();
          
          if(datos.products) set({favorites: datos.products});
        }
     }
     fetching();
  },
  getFavoritesId: () => {
    const {favorites} = get();
    const favoriteId = favorites.map((favorite) => favorite._id);
    return favoriteId
  },

  updateOrderState: (newOrder) => {
    set({ order: newOrder });
  },
}));

export const useFavorites = () => {
  const favorites = useProductStore((state) => state.favorites);
  return favorites;
};

export const useOriginalProducts = () => {
  const originalProducts = useProductStore((state) => state.originalProducts);
  return originalProducts;
};

export const useCurrentPage = () => {
  const currentPage = useProductStore((state) => state.currentPage);
  return currentPage;
};
