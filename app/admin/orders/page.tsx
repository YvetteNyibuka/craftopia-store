"use client";

import { orders } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";
import { Download, Filter, ChevronRight, ChevronLeft, Eye, MoreHorizontal, Package } from "lucide-react";

export default function AdminOrdersPage() {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Delivered": return { pill: "bg-[#E9F8E5] text-[#3F6136]", bar: "bg-[#5CE614]", barW: "100%" };
            case "Shipped": return { pill: "bg-blue-50 text-blue-700", bar: "bg-blue-400", barW: "75%" };
            case "Processing": return { pill: "bg-amber-50 text-amber-700", bar: "bg-amber-400", barW: "45%" };
            case "Pending": return { pill: "bg-stone-100 text-stone-500", bar: "bg-stone-300", barW: "15%" };
            case "Cancelled": return { pill: "bg-red-50 text-red-600", bar: "bg-red-400", barW: "0%" };
            default: return { pill: "bg-stone-100 text-stone-500", bar: "bg-stone-300", barW: "0%" };
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">Orders</h1>
                    <p className="text-[15px] text-stone-500">Track and manage all customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white rounded-[20px] p-3 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <button className="flex items-center justify-between min-w-[140px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors gap-2">
                        <span className="flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Status: All</span>
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                    <button className="flex items-center justify-between min-w-[130px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors gap-2">
                        <span>Date Range</span>
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                    <button className="flex items-center justify-between min-w-[140px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors gap-2">
                        <span>Total Value</span>
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                    <button className="text-[13px] font-bold text-[#5CE614] hover:text-[#4BD600] px-2 whitespace-nowrap transition-colors">
                        Clear Filters
                    </button>
                </div>
                <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end px-2">
                    <span className="text-[13px] text-stone-500 font-medium whitespace-nowrap">
                        Showing 1-{orders.length} of {orders.length} orders
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-stone-100 bg-white">
                                <th className="py-5 px-6 w-[60px]"><div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 bg-white" /></th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Order ID</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Customer</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Date</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Items</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[120px]">Total</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[200px]">Status</th>
                                <th className="py-5 px-6 text-[13px] font-bold text-stone-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {orders.map((order) => {
                                const s = getStatusStyle(order.status);
                                return (
                                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors bg-white">
                                        <td className="py-4 px-6">
                                            <div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 hover:border-[#5CE614] bg-white cursor-pointer transition-colors" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[14px] font-bold text-[#111] font-mono">{order.id}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-[13px] font-bold text-stone-600 flex-shrink-0">
                                                    {order.customerName.slice(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-[14px] font-semibold text-[#111]">{order.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[13px] text-stone-500">{order.date}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-[13px] text-stone-500">
                                                <Package className="w-3.5 h-3.5" />
                                                {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[15px] font-bold text-[#111]">{formatCurrency(order.total)}</span>
                                        </td>
                                        <td className="py-4 px-4 pr-10">
                                            <div className="flex justify-between items-center text-[11px] font-bold mb-1.5">
                                                <span className={s.pill.split(" ")[1]}>{order.status}</span>
                                            </div>
                                            <div className="w-full h-[5px] bg-stone-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${s.bar}`} style={{ width: s.barW }} />
                                            </div>
                                            <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>{order.status}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="text-stone-400 hover:text-[#5CE614] transition-colors p-1.5 rounded-lg hover:bg-stone-100">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-stone-400 hover:text-stone-600 transition-colors p-1.5 rounded-lg hover:bg-stone-100">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-stone-100 px-6 py-5 flex items-center justify-between bg-white">
                    <span className="text-[14px] font-medium text-stone-500">Page 1 of 3</span>
                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-[#5CE614] text-[#111] font-bold text-[13px] flex items-center justify-center">1</button>
                        <button className="w-9 h-9 rounded-full text-stone-500 font-semibold text-[13px] hover:bg-stone-50 flex items-center justify-center">2</button>
                        <button className="w-9 h-9 rounded-full text-stone-500 font-semibold text-[13px] hover:bg-stone-50 flex items-center justify-center">3</button>
                        <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pb-8">
                {[
                    { label: "Total Orders", value: orders.length.toString(), sub: "+8 this week", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length.toString(), sub: "completed", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Processing", value: orders.filter(o => o.status === "Processing").length.toString(), sub: "in progress", subColor: "text-amber-700 bg-amber-50" },
                    { label: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length.toString(), sub: "this month", subColor: "text-red-600 bg-red-50" },
                ].map((card) => (
                    <div key={card.label} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-[13px] font-bold text-stone-500">{card.label}</h3>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${card.subColor}`}>{card.sub}</span>
                        </div>
                        <div className="text-[32px] font-bold text-[#111]">{card.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
