import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

export function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                <Link href={`/shop/${product.slug}`} className="absolute inset-0">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>
                <button className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm text-stone-400 hover:text-red-500 transition-colors z-10">
                    <Heart className="h-5 w-5" />
                </button>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67E4E] bg-[#FDF9F3] px-2.5 py-1 rounded-sm">
                        {product.isBestSeller ? 'Best Seller' : product.isNew ? 'New Season' : product.category}
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
                    <p className="text-muted-foreground text-xs line-clamp-1 mb-4">{product.description}</p>
                </Link>
                <div className="mt-auto">
                    <p className="font-bold text-[19px] text-[#111]">{formatCurrency(product.price)}</p>
                </div>
            </div>
        </div>
    );
}
