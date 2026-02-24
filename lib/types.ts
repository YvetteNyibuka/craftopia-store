export type Product = {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    inStock: boolean;
    stockCount: number;
    rating: number;
    reviewsCount: number;
    isNew?: boolean;
    isBestSeller?: boolean;
};

export type Order = {
    id: string;
    date: string;
    customerName: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    itemCount: number;
};

export type Customer = {
    id: string;
    name: string;
    email: string;
    ordersCount: number;
    totalSpent: number;
    status: 'Active' | 'Inactive';
};

export type CartItem = {
    product: Product;
    quantity: number;
};
