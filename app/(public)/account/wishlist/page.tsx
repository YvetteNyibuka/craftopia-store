"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, Loader2, Star } from "lucide-react";
import { wishlistApi, WishlistProduct } from "@/lib/api/cart";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/format";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api/client";

export default function WishlistPage() {
    const { isAuthenticated } = useAuth();
    const { addItem } = useCartStore();
    const [items, setItems] = useState<WishlistProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removing, setRemoving] = useState<string | null>(null);
    const [addingToCart, setAddingToCart] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) { setIsLoading(false); return; }
        wishlistApi.get()
            .then((r) => setItems(r.data))
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, [isAuthenticated]);

    const handleRemove = async (productId: string) => {
        setRemoving(productId);
        try {
            await wishlistApi.remove(productId);
            setItems((prev) => prev.filter((p) => p._id !== productId));
        } catch (err) {
            console.error(err instanceof ApiError ? err.message : "Failed to remove");
        } finally {
            setRemoving(null);
        }
    };

    const handleAddToCart = async (product: WishlistProduct) => {
        setAddingToCart(product._id);
        try {
            await addItem({
                productId: product._id,
                title: product.title,
                image: product.images?.[0],
                price: product.price,
                slug: product.slug,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setAddingToCart(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-[#5CE614]" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center py-20">
                <Heart className="w-14 h-14 mx-auto text-stone-200 mb-4" />
                <h2 className="text-[22px] font-bold text-[#111] mb-2">Sign in to view your wishlist</h2>
                <p className="text-stone-400 text-sm">Your saved pieces will appear here once you log in.</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <Heart className="w-14 h-14 mx-auto text-stone-200 mb-4" />
                <h2 className="text-[22px] font-bold text-[#111] mb-2">Your wishlist is empty</h2>
                <p className="text-stone-400 text-sm mb-6">Browse our collections and save pieces you love.</p>
                <Link href="/shop" className="inline-block bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold px-8 py-3 rounded-full text-[14px] transition-colors">
                    Explore Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-[#111]">My Wishlist <span className="text-stone-400 font-normal text-[16px]">({items.length})</span></h1>
                <button
                    onClick={async () => { await wishlistApi.clear(); setItems([]); }}
                    className="text-[13px] text-stone-400 hover:text-red-500 font-semibold transition-colors"
                >
                    Clear all
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {items.map((product) => (
                    <div key={product._id} className="bg-[#FAFAFA] rounded-2xl border border-stone-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="relative h-52 bg-stone-100">
                            {product.images?.[0] ? (
                                <Image
                                    src={product.images[0]} alt={product.title}
                                    fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                                    <Heart className="w-12 h-12" />
                                </div>
                            )}
                            <button
                                onClick={() => handleRemove(product._id)}
                                disabled={removing === product._id}
                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                            >
                                {removing === product._id
                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                    : <Trash2 className="w-4 h-4" />}
                            </button>
                            {product.isBestSeller && (
                                <span className="absolute top-3 left-3 bg-[#5CE614] text-black text-[10px] font-bold px-2 py-1 rounded-full">Best Seller</span>
                            )}
                        </div>

                        <div className="p-4">
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">{product.category}</p>
                            <Link href={`/shop/${product.slug}`} className="font-bold text-[15px] text-[#111] hover:text-[#5CE614] transition-colors line-clamp-1">
                                {product.title}
                            </Link>
                            <div className="flex items-center gap-1 mt-1 mb-3">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-[12px] text-stone-500">{product.rating} ({product.reviewsCount})</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-[18px] text-[#111]">{formatCurrency(product.price)}</span>
                                    {product.comparePrice && (
                                        <span className="text-[12px] text-stone-400 line-through ml-2">{formatCurrency(product.comparePrice)}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addingToCart === product._id}
                                    className="flex items-center gap-2 bg-[#111] hover:bg-[#5CE614] text-white hover:text-black font-bold text-[12px] px-4 py-2 rounded-xl transition-colors"
                                >
                                    {addingToCart === product._id
                                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        : <ShoppingCart className="w-3.5 h-3.5" />}
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
