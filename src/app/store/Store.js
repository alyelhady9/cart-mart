import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/authSlice'
import authModalReducer from '../features/openAuthModalSlice'
import wishlistReducer from '../features/wishlistSlice'
import checkoutReducer from '../features/checkoutSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    authModal:authModalReducer,
    wishlist:wishlistReducer,
    checkout: checkoutReducer,
  },
});

export default store;