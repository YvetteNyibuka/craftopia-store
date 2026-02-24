"use client";

import { customers } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";
import { Download, Filter, ChevronRight, ChevronLeft, Mail, MoreHorizontal, UserCheck } from "lucide-react";

export default function AdminCustomersPage() {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Active": return { pill: "bg-[#E9F8E5] text-[#3F6136]", bar: "bg-[#5CE614]", barW: "100%" };
            case "Inactive": return { pill: "bg-stone-100 text-stone-500", bar: "bg-stone-300", barW: "30%" };
            default: return { pill: "bg-stone-100 text-stone-500", bar: "bg-stone-300", barW: "0%" };
        }
    };

    const initials = (name: string) =>
        name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    const avatarColors = [
        "bg-blue-100 text-blue-700",
        "bg-purple-100 text-purple-700",
        "bg-amber-100 text-amber-700",
        "bg-rose-100 text-rose-700",
        "bg-emerald-100 text-emerald-700",
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">Customers</h1>
                    <p className="text-[15px] text-stone-500">View and manage your customer base.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors">
                        <UserCheck className="w-4 h-4" /> Add Customer
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
                        <span>Join Date</span>
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                    <button className="flex items-center justify-between min-w-[140px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors gap-2">
                        <span>Total Spent</span>
                        <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                    <button className="text-[13px] font-bold text-[#5CE614] hover:text-[#4BD600] px-2 whitespace-nowrap transition-colors">
                        Clear Filters
                    </button>
                </div>
                <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end px-2">
                    <span className="text-[13px] text-stone-500 font-medium whitespace-nowrap">
                        Showing 1-{customers.length} of {customers.length} customers
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
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[30%]">Customer</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Email</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Orders</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[120px]">Total Spent</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[180px]">Status</th>
                                <th className="py-5 px-6 text-[13px] font-bold text-stone-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {customers.map((customer, idx) => {
                                const s = getStatusStyle(customer.status);
                                const color = avatarColors[idx % avatarColors.length];
                                return (
                                    <tr key={customer.id} className="hover:bg-stone-50/50 transition-colors bg-white">
                                        <td className="py-4 px-6">
                                            <div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 hover:border-[#5CE614] bg-white cursor-pointer transition-colors" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 ${color}`}>
                                                    {initials(customer.name)}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#111]">{customer.name}</p>
                                                    <p className="text-[11px] text-stone-400 mt-0.5">ID: {customer.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[13px] text-stone-500">{customer.email}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[14px] font-semibold text-[#111]">{customer.ordersCount}</span>
                                            <span className="text-[11px] text-stone-400 ml-1">orders</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[15px] font-bold text-[#111]">{formatCurrency(customer.totalSpent)}</span>
                                        </td>
                                        <td className="py-4 px-4 pr-10">
                                            <div className="w-full h-[5px] bg-stone-100 rounded-full overflow-hidden mb-1.5">
                                                <div className={`h-full rounded-full ${s.bar}`} style={{ width: s.barW }} />
                                            </div>
                                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>{customer.status}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="text-stone-400 hover:text-[#5CE614] transition-colors p-1.5 rounded-lg hover:bg-stone-100">
                                                    <Mail className="w-4 h-4" />
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
                    <span className="text-[14px] font-medium text-stone-500">Page 1 of 4</span>
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
                    { label: "Total Customers", value: customers.length.toString(), sub: "+5 new", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Active", value: customers.filter(c => c.status === "Active").length.toString(), sub: "this month", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Inactive", value: customers.filter(c => c.status !== "Active").length.toString(), sub: "dormant", subColor: "text-stone-500 bg-stone-100" },
                    { label: "Avg. Order Value", value: `$${(customers.reduce((a, c) => a + c.totalSpent, 0) / customers.reduce((a, c) => a + c.ordersCount, 0) || 0).toFixed(0)}`, sub: "per order", subColor: "text-blue-600 bg-blue-50" },
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
