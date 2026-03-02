import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { ApiProduct } from "@/lib/api/products";
import { wishlistApi } from "@/lib/api/cart";
import { formatCurrency } from "@/lib/utils/format";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: ApiProduct }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(
    user?.wishlist?.includes(product._id) || false,
  );
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      if (isInWishlist) {
        await wishlistApi.remove(product._id);
        setIsInWishlist(false);
      } else {
        await wishlistApi.add(product._id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate discount percentage
  const hasDiscount =
    product.comparePrice && product.comparePrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.comparePrice! - product.price) / product.comparePrice!) * 100,
      )
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md z-10">
            -{discountPercentage}%
          </div>
        )}
        <button
          onClick={toggleWishlist}
          disabled={loading}
          className={`absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm transition-colors z-10 ${
            isInWishlist ? "text-red-500" : "text-stone-400 hover:text-red-500"
          }`}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67E4F] bg-[#FDF9F3] px-2.5 py-1 rounded-sm">
            {product.isBestSeller
              ? "Best Seller"
              : product.isNewProduct
                ? "New Season"
                : product.category}
          </span>
          <div className="flex items-center text-xs font-bold text-[#111]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
            {product.rating.toFixed(1)}
          </div>
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-[#5CE614] transition-colors leading-tight mb-1">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-1 mb-4">
            {product.description}
          </p>
        </Link>
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[19px] text-[#111]">
              {formatCurrency(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-stone-400 line-through">
                {formatCurrency(product.comparePrice!)}
              </p>
            )}
          </div>
          {product.stockCount <= 10 && product.stockCount > 0 && (
            <p className="text-xs text-orange-600 mt-1 font-medium">
              Only {product.stockCount} left in stock
            </p>
          )}
          {product.stockCount === 0 && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              Out of stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
