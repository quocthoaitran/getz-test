"use client";

import { useState, useEffect } from "react";
import type { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import MenuItemCard from "@/components/menu-item-card";
import { useCart } from "@/context/cart-context";
import { fetchMenuItems } from "@/lib/api";
import { SearchFilter } from "@/components/search-filter";
import { CheckoutSummary } from "@/components/checkout-summary";
import { CartSidebar } from "@/components/cart-sidebar";

export default function Page() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const { isCartOpen, checkout, openCheckout, closeCart, closeCheckout } =
    useCart();

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    let filtered = menuItems;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (showOnlyAvailable) {
      filtered = filtered.filter((item) => item.available);
    }

    setFilteredItems(filtered);
  }, [menuItems, searchQuery, activeCategory, showOnlyAvailable]);

  const loadMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error("Failed to load menu items:", error);
      setError("Failed to load menu items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
  };

  const handleAvailableToggle = (showOnly: boolean) => {
    setShowOnlyAvailable(showOnly);
  };

  if (openCheckout) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1 p-4">
          <CheckoutSummary onBack={closeCheckout} />
        </main>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      <div className="lg:col-span-3">
        <div className="mb-8">
          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            onAvailableToggle={handleAvailableToggle}
            activeCategory={activeCategory}
            showOnlyAvailable={showOnlyAvailable}
          />
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={loadMenuItems} variant="outline">
              Try Again
            </Button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="bg-muted rounded h-4 mb-2"></div>
                <div className="bg-muted rounded h-3 mb-4"></div>
                <div className="bg-muted rounded h-8"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : activeCategory === "all"
                  ? "All Items"
                  : activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1) +
                    "s"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredItems.length} item
                {filteredItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No items found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <CartSidebar isOpen={true} onClose={() => {}} onCheckout={checkout} />
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={checkout}
      />
    </div>
  );
}
