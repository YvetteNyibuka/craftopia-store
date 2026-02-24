"use client";

import { Filter, Download, CheckCircle2, Truck, XCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function OrderHistoryPage() {
    type OrderItem = {
        id: number;
        imageClass?: string;
        hasFlowers?: boolean;
        hasVase?: boolean;
        isCount?: boolean;
        count?: string;
    };

    type Order = {
        id: string;
        status: string;
        date: string;
        total: number;
        isRefunded?: boolean;
        items: OrderItem[];
    };

    const orders: Order[] = [
        {
            id: "#FH-20942",
            status: "DELIVERED",
            date: "October 24, 2023",
            total: 142.00,
            items: [
                { id: 1, imageClass: "bg-[#E1D4C6]", hasFlowers: true },
                { id: 2, imageClass: "bg-[#2A4720]", hasFlowers: true },
                { id: 3, isCount: true, count: "+1" }
            ]
        },
        {
            id: "#FH-20958",
            status: "IN TRANSIT",
            date: "November 02, 2023",
            total: 89.50,
            items: [
                { id: 1, imageClass: "bg-[#EBEBEB]", hasVase: true }
            ]
        },
        {
            id: "#FH-20711",
            status: "CANCELLED",
            date: "September 15, 2023",
            total: 0.00,
            isRefunded: true,
            items: []
        }
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-[#E9F8E5] text-[#3F6136]";
            case "IN TRANSIT": return "bg-amber-50 text-amber-700";
            case "CANCELLED": return "bg-stone-100 text-stone-500";
            default: return "bg-stone-100 text-stone-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "DELIVERED": return <div className="w-10 h-10 rounded-full bg-[#E9F8E5] flex items-center justify-center text-[#5CE614]"><CheckCircle2 className="w-5 h-5" /></div>;
            case "IN TRANSIT": return <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500"><Truck className="w-5 h-5" /></div>;
            case "CANCELLED": return <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><XCircle className="w-5 h-5" /></div>;
            default: return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-stone-100 pb-8">
                <div>
                    <h1 className="text-[28px] font-bold text-[#111] tracking-tight mb-2">Order History</h1>
                    <p className="text-stone-500 text-[15px]">You have made 12 purchases since joining in 2022.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 h-10 rounded-full border border-stone-200 text-sm font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-5 h-10 rounded-full border border-stone-200 text-sm font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <Download className="w-4 h-4" /> Export Invoices
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="border border-stone-200 rounded-3xl p-6 bg-white shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                {getStatusIcon(order.status)}
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-[17px] font-bold text-[#111]">Order {order.id}</h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border-0 ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-[13px]">
                                        Placed on {order.date} <span className="mx-1.5 text-stone-300">•</span>
                                        {order.isRefunded ? "Refunded" : `Total $${order.total.toFixed(2)}`}
                                    </p>
                                </div>
                            </div>

                            {order.status === "DELIVERED" && (
                                <button className="h-10 px-6 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] text-[13px] font-bold transition-colors shadow-sm">
                                    Reorder
                                </button>
                            )}
                            {order.status === "IN TRANSIT" && (
                                <button className="h-10 px-6 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] text-[13px] font-bold transition-colors shadow-sm">
                                    Track Order
                                </button>
                            )}
                        </div>

                        {order.status === "IN TRANSIT" && (
                            <div className="mb-6 px-14 sm:px-[72px]">
                                <div className="h-1.5 w-full bg-stone-100 rounded-full relative mb-2">
                                    <div className="absolute top-0 left-0 h-full w-[65%] bg-[#5CE614] rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                                    <span className="text-stone-400">Confirmed</span>
                                    <span className="text-[#5CE614]">In Transit</span>
                                    <span className="text-stone-400">Delivered</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between border-t border-stone-100 pt-6 mt-4">
                            <div className="flex items-center gap-[-8px]">
                                {order.items.length > 0 ? (
                                    <div className="flex -space-x-3">
                                        {order.items.map((item, idx) => (
                                            item.isCount ? (
                                                <div key={idx} className="w-10 h-10 rounded-xl bg-stone-200 border-2 border-white flex items-center justify-center text-[11px] font-bold text-stone-600 z-20">
                                                    {item.count}
                                                </div>
                                            ) : (
                                                <div key={idx} className={`w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center overflow-hidden z-${10 - idx} relative ${item.imageClass}`}>
                                                    {item.hasFlowers && (
                                                        <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
                                                    )}
                                                    {item.hasVase && (
                                                        <div className="w-3 h-6 rounded-full bg-[#C7A382] rotate-12" />
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-10"></div>
                                )}
                            </div>

                            <button className="text-[13px] font-bold text-stone-500 hover:text-[#5CE614] flex items-center transition-colors">
                                {order.status === "CANCELLED" ? "View Details" : "View Order Details"}
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 pt-8">
                <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#5CE614] text-[#111] font-bold text-sm shadow-sm flex items-center justify-center">
                    1
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors flex items-center justify-center">
                    2
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors flex items-center justify-center">
                    3
                </button>
                <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
