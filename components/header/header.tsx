import React from "react";
import Image from "next/image";

const Header = () => {
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
        </div>
      </div>
    </header>
  );
};

export default Header;
