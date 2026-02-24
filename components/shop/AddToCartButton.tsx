"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            onClick={handleAdd}
            className="flex-1 bg-[#4A5D44] hover:bg-[#3C4A36] text-white rounded-xl h-14 font-bold text-[15px] shadow-sm transition-all"
        >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {added ? "ADDED TO CART" : "ADD TO CART"}
        </Button>
    );
}
