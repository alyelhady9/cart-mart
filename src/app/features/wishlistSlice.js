// store/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  }
  return [];
};

// Save wishlist to localStorage
const saveWishlistToStorage = (wishlist) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
  notes: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wishlistNotes') || '{}') : {},
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          discountPercentage: product.discountPercentage || 0,
          thumbnail: product.thumbnail,
          images: product.images || [product.thumbnail],
          category: product.category,
          brand: product.brand,
          rating: product.rating,
          stock: product.stock,
          description: product.description,
          addedAt: new Date().toISOString(),
        });
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Remove note if exists
      if (state.notes[productId]) {
        delete state.notes[productId];
        if (typeof window !== 'undefined') {
          localStorage.setItem('wishlistNotes', JSON.stringify(state.notes));
        }
      }
      
      saveWishlistToStorage(state.items);
    },
    updateNote: (state, action) => {
      const { productId, note } = action.payload;
      state.notes[productId] = note;
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlistNotes', JSON.stringify(state.notes));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      state.notes = {};
      saveWishlistToStorage([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wishlistNotes');
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, updateNote, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;