import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      toast.success("Item added to cart");
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
      toast.error("Item removed from cart");
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
      toast.success("Cart updated");
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      toast.error("Cart cleared");
    }
  },
});

export const { addItemToCart, removeItemFromCart, handleCartQty, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export const selectCartSubtotal = (state) => {
 let subtotal = state.cart.cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
  return subtotal;
}