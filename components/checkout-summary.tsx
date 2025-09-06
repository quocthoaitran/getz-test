"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface CheckoutSummaryProps {
  onBack: () => void;
}

export function CheckoutSummary({ onBack }: CheckoutSummaryProps) {
  const { items, total, itemCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = total;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + tax;

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. You will receive a confirmation email
            shortly.
          </p>
          <Button onClick={onBack} className="w-full">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            Checkout Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Payment Information</h3>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({itemCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handleSubmitOrder}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
