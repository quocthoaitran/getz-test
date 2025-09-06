import { MenuItem } from "@/types/menu";

export type CartAction =
  | { type: "ADD_ITEM"; payload: MenuItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CHECKOUT" }
  | { type: "CLOSE_CHECKOUT" };
