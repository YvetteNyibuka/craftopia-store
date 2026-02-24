"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Trash2, ShoppingBag, Star } from "lucide-react";
import { products } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(products.slice(0, 5));

    const remove = (id: string) => setWishlist((w) => w.filter((p) => p.id !== id));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111] tracking-tight mb-1">My Wishlist</h1>
                    <p className="text-stone-400 text-[14px]">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
                </div>
                {wishlist.length > 0 && (
                    <button
                        onClick={() => setWishlist([])}
                        className="text-[13px] font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Clear all
                    </button>
                )}
            </div>

            {wishlist.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 bg-[#E9F4E5] rounded-full flex items-center justify-center mb-5">
                        <Heart className="w-7 h-7 text-[#5CE614]" />
                    </div>
                    <h2 className="text-[18px] font-bold text-[#111] mb-2">Your wishlist is empty</h2>
                    <p className="text-stone-400 text-[14px] mb-7 max-w-xs">
                        Save pieces you love and come back to them anytime.
                    </p>
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 px-7 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] transition-colors"
                    >
                        <ShoppingBag className="w-4 h-4" /> Browse Collections
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <button
                                    onClick={() => remove(product.id)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors z-10"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                {product.isBestSeller && (
                                    <span className="absolute top-3 left-3 bg-[#5CE614] text-[#111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                        Best Seller
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <h3 className="text-[14px] font-bold text-[#111] mt-1 mb-1 leading-tight">{product.title}</h3>
                                <div className="flex items-center gap-1 mb-3">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span className="text-[12px] font-semibold text-stone-500">{product.rating.toFixed(1)}</span>
                                    <span className="text-[11px] text-stone-300">({product.reviewsCount})</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[17px] font-bold text-[#111]">{formatCurrency(product.price)}</p>
                                    <Link
                                        href={`/shop/${product.slug}`}
                                        className="flex items-center gap-2 px-4 h-9 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[12px] transition-colors"
                                    >
                                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
