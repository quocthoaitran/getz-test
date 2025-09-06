import type { MenuItem } from "@/types/menu"

// Mock menu data
const mockMenuItems: MenuItem[] = [
  {
    id: "i-1",
    name: "Beef Bulgogi Rice",
    description: "Korean marinated beef with steamed rice",
    price: 85000,
    category: "main",
    image: "/images/beef-bulgogi-rice-bowl.jpg",
    available: true,
  },
  {
    id: "i-2",
    name: "Chicken Teriyaki Bowl",
    description: "Grilled chicken with teriyaki sauce over rice",
    price: 78000,
    category: "main",
    image: "/images/chicken-teriyaki-bowl.jpg",
    available: true,
  },
  {
    id: "i-3",
    name: "Miso Soup",
    description: "Traditional Japanese soybean paste soup",
    price: 18000,
    category: "appetizer",
    image: "/images/miso-soup-bowl.jpg",
    available: true,
  },
  {
    id: "i-4",
    name: "Green Tea",
    description: "Premium Japanese green tea",
    price: 15000,
    category: "beverage",
    image: "/images/green-tea-cup.jpg",
    available: false,
  },
  {
    id: "i-5",
    name: "Mango Pudding",
    description: "Creamy mango pudding dessert",
    price: 22000,
    category: "dessert",
    image: "/images/mango-pudding-dessert.jpg",
    available: true,
  },
]

// Mock API functions
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMenuItems
}

export const searchMenuItems = async (query: string): Promise<MenuItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMenuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()),
  )
}

export const filterMenuItems = async (category: string): Promise<MenuItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  if (category === "all") return mockMenuItems
  return mockMenuItems.filter((item) => item.category === category)
}
