export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: "appetizer" | "main" | "dessert" | "beverage"
  image: string
  available: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  isCartOpen: boolean
  openCheckout: boolean
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  total: number
  itemCount: number
  openCart: () => void
  closeCart: () => void
  checkout: () => void
  closeCheckout: () => void
}
