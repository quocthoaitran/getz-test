"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  onAvailableToggle: (showOnlyAvailable: boolean) => void;
  activeCategory: string;
  showOnlyAvailable: boolean;
}

const categories = [
  { id: "all", label: "All Items" },
  { id: "appetizer", label: "Appetizers" },
  { id: "main", label: "Main Courses" },
  { id: "dessert", label: "Desserts" },
  { id: "beverage", label: "Beverages" },
];

export function SearchFilter({
  onSearch,
  onFilter,
  onAvailableToggle,
  activeCategory,
  showOnlyAvailable,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search for dishes or drinks..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => onFilter(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        <div className="flex items-center space-x-2 rounded-lg p-3 bg-background/50">
          <Switch
            id="available-only"
            checked={showOnlyAvailable}
            onCheckedChange={onAvailableToggle}
            className="border-2 border-border data-[state=checked]:border-primary"
          />
          <Label htmlFor="available-only" className="text-sm font-medium">
            Only available items
          </Label>
        </div>
      </div>
    </div>
  );
}
