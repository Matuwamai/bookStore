import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
    cartItems: cartItemsFromLocalStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (
      state,
      action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
            item.id !== id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    handleCartQty: (
      state,
      action
    ) => {
      const {id, type} = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === id
      );
      if (type === "inc") {
        existingItem.quantity += 1;
      } else if (type === "dec") {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) =>
                item.id !== id
          );
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  },
});

export const { addItemToCart, removeItemFromCart, handleCartQty, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// Selector to calculate the subtotal
export const selectCartSubtotal = (state) => {
 let subtotal = state.cart.cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
  return subtotal;
}