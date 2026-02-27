"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Loader2 } from "lucide-react";

/** Works with both old Product type and new ApiProduct */
interface ProductLike {
    id?: string;
    _id?: string;
    title: string;
    slug: string;
    images?: string[];
    price: number;
}

export function AddToCartButton({ product }: { product: ProductLike }) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = async () => {
        setIsLoading(true);
        try {
            await addItem({
                productId: product._id ?? product.id ?? "",
                title: product.title,
                image: product.images?.[0],
                price: product.price,
                slug: product.slug,
                quantity: 1,
            });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleAdd}
            disabled={isLoading}
            className="flex-1 bg-[#4A5D44] hover:bg-[#3C4A36] text-white rounded-xl h-14 font-bold text-[15px] shadow-sm transition-all disabled:opacity-70"
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
                <ShoppingBag className="mr-2 h-5 w-5" />
            )}
            {added ? "ADDED TO CART ✓" : "ADD TO CART"}
        </Button>
    );
}
