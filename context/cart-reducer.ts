import { CartItem } from "@/types/menu"
import { CartAction } from "./cart-action"

interface CartState {
  items: CartItem[]
  isCartOpen?: boolean
  openCheckout?: boolean
}

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "CLEAR_CART":
      return { items: [] }

    case "OPEN_CART":
      return { ...state, isCartOpen: true, openCheckout: false }

    case "CLOSE_CART":
      return { ...state, isCartOpen: false }

    case "CHECKOUT":
      return { ...state, isCartOpen: false, openCheckout: true }

    case "CLOSE_CHECKOUT":
      return { ...state, openCheckout: false }

    default:
      return state
  }
}
