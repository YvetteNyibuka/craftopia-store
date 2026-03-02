"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Loader2, ChevronRight } from "lucide-react";
import { ordersApi, ApiOrder } from "@/lib/api/orders";
import { formatCurrency } from "@/lib/utils/format";
import { useAuth } from "@/contexts/AuthContext";

const STATUS_STYLES: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600 border-amber-200",
    Processing: "bg-blue-50 text-blue-600 border-blue-200",
    Shipped: "bg-purple-50 text-purple-600 border-purple-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function OrdersPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [orders, setOrders] = useState<ApiOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) { setIsLoading(false); return; }
        setIsLoading(true);
        ordersApi.list({ page, limit: 10 })
            .then((r) => { setOrders(r.data); setTotalPages(r.pages); setTotal(r.total); })
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, [isAuthenticated, page]);

    if (authLoading || isLoading) {
        return <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-[#5CE614]" /></div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center py-20">
                <Package className="w-14 h-14 mx-auto text-stone-200 mb-4" />
                <h2 className="text-[22px] font-bold text-[#111] mb-2">Sign in to view your orders</h2>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <Package className="w-14 h-14 mx-auto text-stone-200 mb-4" />
                <h2 className="text-[22px] font-bold text-[#111] mb-2">No orders yet</h2>
                <p className="text-stone-400 text-sm mb-6">Your order history will appear here after you make a purchase.</p>
                <Link href="/shop" className="inline-block bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold px-8 py-3 rounded-full text-[14px] transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-[#111]">Order History <span className="text-stone-400 font-normal text-[16px]">({total})</span></h1>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-[#FAFAFA] rounded-2xl border border-stone-100 p-5 hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-[15px] text-[#111]">{order.orderNumber}</span>
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] ?? ""}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-[13px] text-stone-400 mb-3">
                                    {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                                    {" · "}{order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <span key={i} className="text-[12px] text-stone-500 bg-white border border-stone-100 px-2.5 py-1 rounded-lg">
                                            {item.title} ×{item.quantity}
                                        </span>
                                    ))}
                                    {order.items.length > 3 && (
                                        <span className="text-[12px] text-stone-400 px-2.5 py-1">+{order.items.length - 3} more</span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-bold text-[18px] text-[#111]">{formatCurrency(order.total)}</p>
                                <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-widest mt-1">
                                    {order.paymentStatus}
                                </p>
                            </div>
                        </div>
                        {order.trackingNumber && (
                            <div className="mt-3 pt-3 border-t border-stone-100 text-[12px] text-stone-500">
                                📦 Tracking: <span className="font-bold text-[#111]">{order.trackingNumber}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p} onClick={() => setPage(p)}
                            className={`w-9 h-9 rounded-xl text-[13px] font-bold transition-colors ${p === page ? "bg-[#5CE614] text-black" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
