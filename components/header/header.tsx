"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Badge, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CartSidebar } from "../cart-sidebar";

const Header = () => {
  const { itemCount, openCart, isCartOpen, checkout, closeCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={48}
              height={48}
              className="text-primary"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">Bistro Menu</h1>
              <p className="text-sm text-muted-foreground">
                Fresh ingredients, exceptional taste
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={openCart}
            className="relative lg:hidden"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={checkout}
      />
    </header>
  );
};

export default Header;
