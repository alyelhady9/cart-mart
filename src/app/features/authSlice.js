// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     loggedIn: false,
//     userName: null
//   },
//   reducers: {
//     login: (state) => {
//       state.loggedIn = true;
//     },
//     logout: (state) => {
//       state.loggedIn = false;
//     },
//     setUserName: (state, action) => {
//       state.userName = action.payload;
//     }
//   },
// });

// export const { login, logout, setUserName } = authSlice.actions;
// export default authSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// // Helper functions for localStorage
// const saveToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('auth', JSON.stringify({
//       loggedIn: state.loggedIn,
//       userName: state.userName
//     }));
//   } catch (error) {
//     console.error('Failed to save to localStorage:', error);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const saved = localStorage.getItem('auth');
//     return saved ? JSON.parse(saved) : { loggedIn: false, userName: null };
//   } catch (error) {
//     console.error('Failed to load from localStorage:', error);
//     return { loggedIn: false, userName: null };
//   }
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: loadFromLocalStorage(),
//   reducers: {
//     login: (state) => {
//       state.loggedIn = true;
//       saveToLocalStorage(state);
//     },
//     logout: (state) => {
//       state.loggedIn = false;
//       state.userName = null;
//       saveToLocalStorage(state);
//     },
//     setUserName: (state, action) => {
//       state.userName = action.payload;
//       saveToLocalStorage(state);
//     }
//   },
// });

// export const { login, logout, setUserName } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('auth', JSON.stringify({
      loggedIn: state.loggedIn,
      userName: state.userName
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { loggedIn: false, userName: null };
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return { loggedIn: false, userName: null };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    userName: null,
    isHydrated: false
  },
  reducers: {
    hydrateAuth: (state) => {
      const saved = loadFromLocalStorage();
      state.loggedIn = saved.loggedIn;
      state.userName = saved.userName;
      state.isHydrated = true;
    },
    login: (state) => {
      state.loggedIn = true;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userName = null;
      saveToLocalStorage(state);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      saveToLocalStorage(state);
    }
  },
});

export const { hydrateAuth, login, logout, setUserName } = authSlice.actions;
export default authSlice.reducer;