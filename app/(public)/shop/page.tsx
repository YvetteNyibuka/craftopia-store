"use client";

import { useState, useEffect } from "react";
import { productsApi, ApiProduct } from "@/lib/api/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

const categories = [
  "Floral Arrangements",
  "Dried Flowers",
  "Home Décor",
  "Seasonal Specials",
  "Gift Sets",
];

const colors = ["#C5C7A5", "#F5F5DC", "#D2691E", "#FFFFFF", "#333333"];

export default function ShopPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [activeColor, setActiveColor] = useState("#C5C7A5");
  const [activeMaterial, setActiveMaterial] = useState("Natural");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    loadProducts();
  }, [page, activeCategory, sortBy, sortOrder]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsApi.list({
        page,
        limit: 12,
        category: activeCategory,
        sort: sortBy,
        order: sortOrder,
        status: "active",
      });
      setProducts(response.data);
      setTotal(response.total);
      setPages(response.pages);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(activeCategory === category ? undefined : category);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    if (value === "newest") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (value === "price-low") {
      setSortBy("price");
      setSortOrder("asc");
    } else if (value === "price-high") {
      setSortBy("price");
      setSortOrder("desc");
    } else if (value === "bestselling") {
      setSortBy("rating");
      setSortOrder("desc");
    }
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-10">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-60 lg:w-64 flex-shrink-0 space-y-10">
        <div>
          <h3 className="font-bold text-xs tracking-widest uppercase text-muted-foreground mb-5">
            Categories
          </h3>
          <ul className="space-y-3.5">
            {categories.map((cat) => (
              <li
                key={cat}
                className="flex items-center justify-between group cursor-pointer"
                onClick={() => handleCategoryChange(cat)}
              >
                <div className="flex items-center gap-3 w-content">
                  <div
                    className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${activeCategory === cat ? "border-[#5CE614] bg-[#5CE614]/10" : "border-stone-200 group-hover:border-[#5CE614]"}`}
                  >
                    {activeCategory === cat && (
                      <Check
                        className="h-3 w-3 text-[#5CE614]"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[14px] ${activeCategory === cat ? "font-medium text-[#111]" : "text-stone-500 group-hover:text-stone-800"}`}
                  >
                    {cat}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xs tracking-widest uppercase text-muted-foreground mb-5">
            Price Range
          </h3>
          <div className="px-2">
            <div className="h-1 w-full bg-stone-200 rounded-full relative mb-4">
              <div className="absolute left-[15%] right-[40%] h-full bg-[#5CE614] rounded-full"></div>
              <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#5CE614] rounded-full cursor-grab"></div>
              <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-[#5CE614] rounded-full cursor-grab"></div>
            </div>
            <div className="flex justify-between text-xs text-stone-600 font-medium">
              <span>$20</span>
              <span>$450+</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xs tracking-widest uppercase text-muted-foreground mb-5">
            Color
          </h3>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`w-[34px] h-[34px] rounded-full border-2 transition-all flex items-center justify-center ${activeColor === color ? "border-[#5CE614]" : "border-transparent"}`}
              >
                <div
                  className="w-full h-full rounded-full border border-black/10 m-0.5"
                  style={{ backgroundColor: color }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xs tracking-widest uppercase text-muted-foreground mb-5">
            Material
          </h3>
          <div className="flex bg-[#F5F5F5] p-1 rounded-xl">
            <button
              className={`flex-1 py-1.5 text-[13px] font-bold rounded-lg transition-colors ${activeMaterial === "Natural" ? "bg-white text-[#5CE614] shadow-sm" : "text-muted-foreground"}`}
              onClick={() => setActiveMaterial("Natural")}
            >
              Natural
            </button>
            <button
              className={`flex-1 py-1.5 text-[13px] font-medium rounded-lg transition-colors ${activeMaterial === "Artificial" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
              onClick={() => setActiveMaterial("Artificial")}
            >
              Artificial
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-stone-100 pb-4">
          <div>
            <h1 className="text-[28px] font-bold font-serif text-[#111] leading-tight mb-1">
              Shop All Products
            </h1>
            <p className="text-stone-500 text-sm">
              {loading
                ? "Loading..."
                : `Showing ${products.length > 0 ? (page - 1) * 12 + 1 : 0}-${Math.min(page * 12, total)} of ${total} items`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span>Sort by:</span>
            <select
              className="border-0 bg-transparent font-semibold text-[#111] focus:ring-0 cursor-pointer outline-none"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bestselling">Best Selling</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#5CE614]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-16">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-center flex-col items-center">
                {page < pages && (
                  <Button
                    variant="outline"
                    className="rounded-xl px-8 h-12 font-bold border-stone-200 text-stone-700 hover:bg-stone-50 mb-6"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load More Products
                  </Button>
                )}
                <div className="flex gap-1.5">
                  {Array.from({ length: Math.min(pages, 4) }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[5px] h-[5px] rounded-full cursor-pointer ${i === page - 1 ? "bg-[#5CE614]" : "bg-stone-300"}`}
                      onClick={() => setPage(i + 1)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
