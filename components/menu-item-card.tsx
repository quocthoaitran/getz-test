import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { Badge } from "./ui/badge";
import { useCart } from "@/context/cart-context";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "appetizer":
        return "bg-green-100 text-green-800";
      case "main":
        return "bg-blue-100 text-blue-800";
      case "dessert":
        return "bg-pink-100 text-pink-800";
      case "beverage":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${
        !item.available ? "opacity-75 grayscale" : ""
      }`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
        <Badge
          className={`absolute top-2 right-2 ${getCategoryColor(
            item.category
          )}`}
        >
          {item.category}
        </Badge>
        {!item.available && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Unavailable
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-balance">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addItem(item)}
          disabled={!item.available}
          className="w-full"
          size="sm"
          variant={!item.available ? "secondary" : "default"}
        >
          <Plus className="w-4 h-4 mr-2" />
          {item.available ? "Add to Cart" : "Currently Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
