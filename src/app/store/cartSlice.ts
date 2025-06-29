import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
  uniqueId: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const uniqueId = `${action.payload.id}_${Date.now()}`;
      const newItem = { ...action.payload, uniqueId, quantity: 1 };
      state.items.push(newItem);
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uniqueId !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ uniqueId: string; quantity: number }>
    ) => {
      const itemToUpdate = state.items.find(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.quantity;
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.uniqueId !== action.payload.uniqueId
          );
        }
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
