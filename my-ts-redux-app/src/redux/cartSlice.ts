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
    itemPicture: string;
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
        itemPicture: string;
      }>
    ) => {
      const { itemId, itemName, itemPrice, itemQuantity, itemPicture } =
        action.payload;

      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        existingItem.itemQuantity = String(
          parseInt(existingItem.itemQuantity) + 1
        );
      } else {
        state.items.push({
          itemId,
          itemName,
          itemPrice,
          itemQuantity,
          itemPicture,
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
    updateQuantity: (
      state,
      action: PayloadAction<{
        itemId: string;
        itemQuantity: string;
      }>
    ) => {
      state.items.map((item) => {
        if (item.itemId === action.payload.itemId) {
          item.itemQuantity = action.payload.itemQuantity;
        }
        return item;
      });
    },
  },
});

export const { addItem, removeItem, deleteAllItems, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
