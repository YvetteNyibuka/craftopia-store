"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, DollarSign, ShoppingBag, AlertTriangle, Users, Loader2, MoreHorizontal, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { ordersApi, ApiOrder, customersApi } from "@/lib/api/orders";
import { productsApi, ApiProduct } from "@/lib/api/products";

interface DashStats {
    revenue: number;
    ordersTotal: number;
    customersTotal: number;
    lowStockTotal: number;
    ordersByStatus: Record<string, number>;
    recentOrders: ApiOrder[];
    topProducts: ApiProduct[];
}

const STATUS_STYLES: Record<string, string> = {
    Pending: "bg-stone-100 text-stone-600",
    Processing: "bg-amber-50 text-amber-700",
    Shipped: "bg-blue-50 text-blue-700",
    Delivered: "bg-[#E9F8E5] text-[#3F6136]",
    Cancelled: "bg-red-50 text-red-600",
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [orderStats, custStats, recentOrders, lowStock, topProds] = await Promise.all([
                    ordersApi.stats(),
                    customersApi.stats(),
                    ordersApi.list({ limit: 6 }),
                    productsApi.lowStock(10),
                    productsApi.list({ limit: 5 }),
                ]);

                setStats({
                    revenue: orderStats.data.revenue ?? 0,
                    ordersTotal: orderStats.data.total ?? 0,
                    customersTotal: custStats.data.total ?? 0,
                    lowStockTotal: lowStock.total ?? 0,
                    ordersByStatus: orderStats.data.byStatus ?? {},
                    recentOrders: recentOrders.data,
                    topProducts: topProds.data,
                });
            } catch (e) {
                console.error("Dashboard load error:", e);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[#5CE614]" />
            </div>
        );
    }

    const s = stats!;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#111] mb-1 tracking-tight">Dashboard Overview</h1>
                <p className="text-sm text-stone-500">Live data from your store.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                    { icon: DollarSign, label: "Total Revenue", value: formatCurrency(s.revenue), iconBg: "bg-[#E9F8E5]", iconColor: "text-[#5CE614]" },
                    { icon: ShoppingBag, label: "Total Orders", value: String(s.ordersTotal), iconBg: "bg-stone-100", iconColor: "text-stone-600" },
                    { icon: Users, label: "Customers", value: String(s.customersTotal), iconBg: "bg-blue-50", iconColor: "text-blue-500" },
                    { icon: AlertTriangle, label: "Low Stock", value: String(s.lowStockTotal), iconBg: "bg-amber-50", iconColor: "text-amber-500" },
                ].map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor}`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            <div className="bg-[#E9F8E5] text-[#3F6136] px-2.5 py-1 rounded-full text-xs font-bold flex items-center">
                                <ArrowUpRight className="w-3 h-3 mr-1 text-[#5CE614]" /> Live
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-stone-500 mb-1">{card.label}</p>
                        <h2 className="text-3xl font-bold text-[#111]">{card.value}</h2>
                    </div>
                ))}
            </div>

            {/* Sales chart + status breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Revenue chart placeholder */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[24px] shadow-sm border border-stone-100 h-80 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="font-bold text-lg text-[#111]">Monthly Sales Performance</h2>
                            <p className="text-sm text-stone-500">Revenue trends</p>
                        </div>
                    </div>
                    <div className="absolute inset-x-8 bottom-10 top-28">
                        <div className="h-full w-full flex items-end">
                            <svg viewBox="0 0 1000 200" className="w-full h-full drop-shadow-lg">
                                <path d="M0,180 C150,160 250,80 500,70 C700,60 850,-10 1000,50" fill="none" stroke="#5CE614" strokeWidth="4" strokeLinecap="round" />
                                <path d="M0,180 C150,160 250,80 500,70 C700,60 850,-10 1000,50 L1000,200 L0,200 Z" fill="url(#chartGradient2)" />
                                <defs>
                                    <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#5CE614" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#5CE614" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-bold text-stone-400 tracking-wider translate-y-6">
                            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                            <span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
                        </div>
                    </div>
                </div>

                {/* Order status breakdown */}
                <div className="bg-white rounded-[24px] shadow-sm border border-stone-100 p-6">
                    <h2 className="font-bold text-lg text-[#111] mb-5">Orders by Status</h2>
                    <div className="space-y-3">
                        {Object.entries(s.ordersByStatus).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between">
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[status] ?? "bg-stone-100 text-stone-600"}`}>
                                    {status}
                                </span>
                                <span className="font-bold text-[#111] text-[15px]">{count}</span>
                            </div>
                        ))}
                        {Object.keys(s.ordersByStatus).length === 0 && (
                            <p className="text-stone-400 text-sm">No orders yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent orders + Top products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Recent orders */}
                <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-stone-100 overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-[#111]">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors">View All</Link>
                    </div>
                    {s.recentOrders.length === 0 ? (
                        <p className="p-6 text-stone-400 text-sm">No orders yet.</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-stone-100 text-left text-xs font-bold text-stone-500 bg-stone-50/50">
                                    <th className="px-6 py-4">Order #</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {s.recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-[#5CE614]">{order.orderNumber}</td>
                                        <td className="px-6 py-4 text-sm text-[#111]">{order.customerName}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#111]">{formatCurrency(order.total)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[order.status] ?? ""}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Top products */}
                <div className="bg-white rounded-[24px] shadow-sm border border-stone-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="font-bold text-lg text-[#111]">Top Products</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"><Filter className="w-3.5 h-3.5" /></button>
                            <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-4 pb-2 border-b border-stone-100 px-1">
                        <div className="col-span-2">Product</div>
                        <div className="text-right">Reviews</div>
                        <div className="text-right">Price</div>
                    </div>
                    <div className="space-y-4 px-1">
                        {s.topProducts.map((p) => (
                            <div key={p._id} className="grid grid-cols-4 items-center gap-2">
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden">
                                        {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />}
                                    </div>
                                    <span className="text-[12px] font-bold text-[#111] truncate">{p.title}</span>
                                </div>
                                <div className="text-right text-[12px] font-medium text-stone-500">{p.reviewsCount}</div>
                                <div className="text-right text-[12px] font-bold text-[#5CE614]">{formatCurrency(p.price)}</div>
                            </div>
                        ))}
                        {s.topProducts.length === 0 && <p className="text-stone-400 text-sm">No products yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
