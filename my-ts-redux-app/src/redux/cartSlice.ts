import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartState {
  id: string;
  name: string;
  email: string;
  items: Array<{
    itemId: string;
    itemName: string;
    itemPrice: string;
    itemQuantity: string;
  }>;
}

const initialState: cartState = {
  id: "",
  name: "",
  email: "",
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        itemName: string;
        itemPrice: string;
        itemQuantity: string;
      }>
    ) => {
      const { itemId, itemName, itemPrice, itemQuantity } = action.payload;

      // Check if item with the same itemId exists in the cart
      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        // If item exists, update its quantity
        console.log(
          "existing",
          existingItem.itemQuantity,
          "/n new:",
          itemQuantity
        );
        existingItem.itemQuantity = String(
          parseInt(existingItem.itemQuantity) + 1
        );
      } else {
        // If item doesn't exist, add it to the cart
        state.items.push({
          itemId,
          itemName,
          itemPrice,
          itemQuantity,
        });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{
        itemId: string;
      }>
    ) => {
      state.items = state.items.filter(
        (item) => item.itemId !== action.payload.itemId
      );
    },
    deleteAllItems: (state, action: PayloadAction<string>) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteAllItems } = cartSlice.actions;
export default cartSlice.reducer;
