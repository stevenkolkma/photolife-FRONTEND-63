import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price, imageUrl } = action.payload;
      const newCartItems = state.cartItems.map((item) => {
        if (item.photoId === id) {
          return { ...item, photoId: id, quantity: item.quantity + 1 };
        }
        return item;
      });
      if (!newCartItems.find((item) => item.photoId === id)) {
        newCartItems.push({
          photoId: id,
          imageUrl: imageUrl,
          quantity: 1,
          price,
        });
      }
      return { ...state, cartItems: newCartItems };
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.photoId !== action.payload
        ),
      };
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    incrementQuantity: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.photoId === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    },
    decrementQuantity: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.photoId === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        }),
      };
    },
    updateQuantity: (state, action) => {
      console.log("updatedQuantity called with", action.payload);
      const { photoId, quantity } = action.payload;
      console.log(photoId, quantity);
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.photoId === photoId) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        }),
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  updateQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
