"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils/format";
import { Download, ChevronRight, Eye, Loader2, Search, RefreshCw } from "lucide-react";
import { ordersApi, ApiOrder } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";

const STATUS_STYLES: Record<string, { pill: string; bar: string; barW: string }> = {
    Delivered: { pill: "bg-[#E9F8E5] text-[#3F6136]", bar: "bg-[#5CE614]", barW: "100%" },
    Shipped: { pill: "bg-blue-50 text-blue-700", bar: "bg-blue-400", barW: "75%" },
    Processing: { pill: "bg-amber-50 text-amber-700", bar: "bg-amber-400", barW: "45%" },
    Pending: { pill: "bg-stone-100 text-stone-500", bar: "bg-stone-300", barW: "15%" },
    Cancelled: { pill: "bg-red-50 text-red-600", bar: "bg-red-400", barW: "0%" },
};

const ALL_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const;
type OrderStatus = typeof ALL_STATUSES[number];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<ApiOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
    const [search, setSearch] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await ordersApi.list({
                page,
                limit: 12,
                ...(statusFilter ? { status: statusFilter } : {}),
                ...(search ? { search } : {}),
            });
            setOrders(res.data);
            setTotal(res.total);
            setTotalPages(res.pages);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { load(); }, [page, statusFilter]); // eslint-disable-line

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        setUpdatingId(orderId);
        try {
            const updated = await ordersApi.updateStatus(orderId, newStatus);
            setOrders((prev) => prev.map((o) => o._id === orderId ? updated.data : o));
        } catch (err) {
            alert(err instanceof ApiError ? err.message : "Failed to update status.");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">Orders</h1>
                    <p className="text-[15px] text-stone-500">{total} total orders</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={load} className="flex items-center gap-2 px-4 h-10 rounded-full border border-stone-200 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-[20px] p-3 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <button
                        onClick={() => { setStatusFilter(""); setPage(1); }}
                        className={`px-4 h-9 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap ${!statusFilter ? "bg-[#5CE614] text-black" : "border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                    >
                        All
                    </button>
                    {ALL_STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => { setStatusFilter(s); setPage(1); }}
                            className={`px-4 h-9 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap ${statusFilter === s ? "bg-[#5CE614] text-black" : "border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search order # or customer…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { setPage(1); load(); } }}
                        className="w-full md:w-[260px] h-10 pl-9 pr-4 rounded-xl border border-stone-200 text-[13px] focus:outline-none focus:border-[#5CE614]"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-stone-100 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 bg-stone-50">
                            <th className="px-6 py-4">Order #</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {isLoading ? (
                            <tr><td colSpan={8} className="px-6 py-16 text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-[#5CE614] mx-auto" />
                            </td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={8} className="px-6 py-16 text-center text-stone-400 text-sm">No orders found.</td></tr>
                        ) : orders.map((order) => {
                            const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.Pending;
                            return (
                                <tr key={order._id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-[13px] font-bold text-[#5CE614]">{order.orderNumber}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-[13px] font-bold text-[#111]">{order.customerName}</p>
                                        <p className="text-[12px] text-stone-400">{order.customerEmail}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-stone-500">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-stone-600">{order.items.length}</td>
                                    <td className="px-6 py-4 text-[14px] font-bold text-[#111]">{formatCurrency(order.total)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${order.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${style.pill}`}>{order.status}</span>
                                            <div className="w-16 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                                                <div className={`h-full rounded-full ${style.bar}`} style={{ width: style.barW }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {updatingId === order._id ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-[#5CE614]" />
                                        ) : (
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value as OrderStatus)}
                                                    className="text-[12px] font-semibold border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#5CE614] bg-white"
                                                >
                                                    {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between">
                        <p className="text-[13px] text-stone-500">Page {page} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                                className="px-4 h-9 rounded-xl border border-stone-200 text-[13px] font-bold text-stone-600 disabled:opacity-40 hover:bg-stone-50 transition-colors">
                                Previous
                            </button>
                            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
                                className="px-4 h-9 rounded-xl border border-stone-200 text-[13px] font-bold text-stone-600 disabled:opacity-40 hover:bg-stone-50 transition-colors">
                                Next <ChevronRight className="inline w-3.5 h-3.5 ml-1" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
