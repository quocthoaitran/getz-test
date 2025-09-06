"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    tax,
    total,
    itemCount,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto h-[100vh] lg:h-auto">
      <div
        className="absolute inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl lg:relative lg:shadow-none">
        <Card className="h-full rounded-none border-0 lg:border lg:rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart ({itemCount})
            </CardTitle>
            <Button
              variant="ghost"
              size="default"
              onClick={onClose}
              className="lg:hidden text-2xl font-light h-10 w-10 p-0"
            >
              ×
            </Button>
          </CardHeader>

          <CardContent className="flex flex-col h-full pb-6">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 border rounded-lg"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-primary font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Tax (10%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                      <span>Grand Total:</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={onCheckout} className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="w-full bg-transparent"
                      size="sm"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
