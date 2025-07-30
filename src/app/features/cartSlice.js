// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     isOpen: false,
//     totalItems: 0,
//     totalPrice: 0,
//   },
//   reducers: {
//     addItem: (state, action) => {
//       const { id, name, price, image, quantity = 1 } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
      
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({
//           id,
//           name,
//           price,
//           image,
//           quantity
//         });
//       }
      
//       // Update totals
//       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//     },
    
//     removeItem: (state, action) => {
//       const id = action.payload;
//       state.items = state.items.filter(item => item.id !== id);
      
//       // Update totals
//       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//     },
    
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);
      
//       if (item) {
//         if (quantity <= 0) {
//           state.items = state.items.filter(item => item.id !== id);
//         } else {
//           item.quantity = quantity;
//         }
        
//         // Update totals
//         state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//         state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       }
//     },
    
//     clearCart: (state) => {
//       state.items = [];
//       state.totalItems = 0;
//       state.totalPrice = 0;
//     },
    
//     toggleCart: (state) => {
//       state.isOpen = !state.isOpen;
//     },
    
//     openCart: (state) => {
//       state.isOpen = true;
//     },
    
//     closeCart: (state) => {
//       state.isOpen = false;
//     }
//   }
// });

// export const {
//   addItem,
//   removeItem,
//   updateQuantity,
//   clearCart,
//   toggleCart,
//   openCart,
//   closeCart
// } = cartSlice.actions;

// export default cartSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// // Helper functions for localStorage
// const saveToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify({
//       items: state.items,
//       isOpen: state.isOpen,
//       totalItems: state.totalItems,
//       totalPrice: state.totalPrice
//     }));
//   } catch (error) {
//     console.error('Failed to save to localStorage:', error);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const saved = localStorage.getItem('cart');
//     return saved ? JSON.parse(saved) : {
//       items: [],
//       isOpen: false,
//       totalItems: 0,
//       totalPrice: 0
//     };
//   } catch (error) {
//     console.error('Failed to load from localStorage:', error);
//     return {
//       items: [],
//       isOpen: false,
//       totalItems: 0,
//       totalPrice: 0
//     };
//   }
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: loadFromLocalStorage(),
//   reducers: {
//     addItem: (state, action) => {
//       const { id, name, price, image, quantity = 1 } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
      
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({
//           id,
//           name,
//           price,
//           image,
//           quantity
//         });
//       }
      
//       // Update totals
//       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       saveToLocalStorage(state);
//     },
    
//     removeItem: (state, action) => {
//       const id = action.payload;
//       state.items = state.items.filter(item => item.id !== id);
      
//       // Update totals
//       state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       saveToLocalStorage(state);
//     },
    
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find(item => item.id === id);
      
//       if (item) {
//         if (quantity <= 0) {
//           state.items = state.items.filter(item => item.id !== id);
//         } else {
//           item.quantity = quantity;
//         }
        
//         // Update totals
//         state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
//         state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       }
//       saveToLocalStorage(state);
//     },
    
//     clearCart: (state) => {
//       state.items = [];
//       state.totalItems = 0;
//       state.totalPrice = 0;
//       saveToLocalStorage(state);
//     },
    
//     toggleCart: (state) => {
//       state.isOpen = !state.isOpen;
//       saveToLocalStorage(state);
//     },
    
//     openCart: (state) => {
//       state.isOpen = true;
//       saveToLocalStorage(state);
//     },
    
//     closeCart: (state) => {
//       state.isOpen = false;
//       saveToLocalStorage(state);
//     }
//   }
// });

// export const {
//   addItem,
//   removeItem,
//   updateQuantity,
//   clearCart,
//   toggleCart,
//   openCart,
//   closeCart
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      isOpen: state.isOpen,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0
    };
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return {
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0
    };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
    totalItems: 0,
    totalPrice: 0,
    isHydrated: false
  },
  reducers: {
    hydrateCart: (state) => {
      const saved = loadFromLocalStorage();
      state.items = saved.items;
      state.isOpen = saved.isOpen;
      state.totalItems = saved.totalItems;
      state.totalPrice = saved.totalPrice;
      state.isHydrated = true;
    },
    addItem: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          quantity
        });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      saveToLocalStorage(state);
    },
    
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      saveToLocalStorage(state);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
      saveToLocalStorage(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveToLocalStorage(state);
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
      saveToLocalStorage(state);
    },
    
    openCart: (state) => {
      state.isOpen = true;
      saveToLocalStorage(state);
    },
    
    closeCart: (state) => {
      state.isOpen = false;
      saveToLocalStorage(state);
    }
  }
});

export const {
  hydrateCart,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions;

export default cartSlice.reducer;