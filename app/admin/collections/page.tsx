"use client";

import Link from "next/link";
import { Plus, Filter, ChevronRight, ChevronLeft, Settings, MoreHorizontal, Eye } from "lucide-react";

const collections = [
    { id: 1, name: "Floral Arrangements", slug: "floral-arrangements", products: 42, status: "Active", updatedAt: "Updated 2h ago", color: "bg-rose-100", revenue: "$3,240" },
    { id: 2, name: "Dried Flowers", slug: "dried-flowers", products: 28, status: "Active", updatedAt: "Updated 1d ago", color: "bg-amber-100", revenue: "$1,890" },
    { id: 3, name: "Home Décor", slug: "home-decor", products: 35, status: "Active", updatedAt: "Updated 5h ago", color: "bg-orange-100", revenue: "$2,650" },
    { id: 4, name: "Seasonal Specials", slug: "seasonal-specials", products: 12, status: "Inactive", updatedAt: "Updated 3d ago", color: "bg-blue-100", revenue: "$560" },
    { id: 5, name: "Gift Sets", slug: "gift-sets", products: 7, status: "Active", updatedAt: "Updated 6h ago", color: "bg-purple-100", revenue: "$920" },
];

export default function AdminCollectionsPage() {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] text-stone-500 font-medium">
                <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                <span className="text-[#111] font-semibold">Collections</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">Collections</h1>
                    <p className="text-[15px] text-stone-500">Organise and manage your product collections.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors">
                        <Plus className="w-4 h-4" /> New Collection
                    </button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="bg-white rounded-[20px] p-3 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <button className="flex items-center gap-2 min-w-[140px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors">
                        <Filter className="w-3.5 h-3.5" /> Status: All
                        <ChevronRight className="w-3.5 h-3.5 rotate-90 ml-auto" />
                    </button>
                    <button className="flex items-center gap-2 min-w-[130px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors">
                        Products
                        <ChevronRight className="w-3.5 h-3.5 rotate-90 ml-auto" />
                    </button>
                    <button className="text-[13px] font-bold text-[#5CE614] hover:text-[#4BD600] px-2 whitespace-nowrap transition-colors">
                        Clear Filters
                    </button>
                </div>
                <span className="text-[13px] text-stone-500 font-medium px-2">
                    Showing 1-{collections.length} of {collections.length} collections
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-stone-100 bg-white">
                                <th className="py-5 px-6 w-[60px]"><div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 bg-white" /></th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[35%]">Collection</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Slug</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Products</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Revenue</th>
                                <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[160px]">Visibility</th>
                                <th className="py-5 px-6 text-[13px] font-bold text-stone-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {collections.map((col, idx) => {
                                const isActive = col.status === "Active";
                                return (
                                    <tr key={col.id} className="hover:bg-stone-50/50 transition-colors bg-white">
                                        <td className="py-4 px-6">
                                            <div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 hover:border-[#5CE614] bg-white cursor-pointer transition-colors" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 ${col.color}`} />
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#111]">{col.name}</p>
                                                    <p className="text-[11px] text-stone-400 mt-0.5">{col.updatedAt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[13px] font-medium text-stone-500 font-mono">/{col.slug}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[14px] font-bold text-[#111]">{col.products}</span>
                                            <span className="text-[11px] text-stone-400 ml-1">items</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[15px] font-bold text-[#111]">{col.revenue}</span>
                                        </td>
                                        <td className="py-4 px-4 pr-10">
                                            <div className="w-full h-[5px] bg-stone-100 rounded-full overflow-hidden mb-1.5">
                                                <div className={`h-full rounded-full ${isActive ? "bg-[#5CE614]" : "bg-stone-300"}`} style={{ width: isActive ? "100%" : "30%" }} />
                                            </div>
                                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-[#E9F8E5] text-[#3F6136]" : "bg-stone-100 text-stone-500"}`}>
                                                {col.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="text-stone-400 hover:text-[#5CE614] transition-colors p-1.5 rounded-lg hover:bg-stone-100">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-stone-400 hover:text-stone-600 transition-colors p-1.5 rounded-lg hover:bg-stone-100">
                                                    <Settings className="w-4 h-4" />
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
                    <span className="text-[14px] font-medium text-stone-500">Page 1 of 1</span>
                    <div className="flex items-center gap-2">
                        <button disabled className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-300">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-[#5CE614] text-[#111] font-bold text-[13px] flex items-center justify-center">1</button>
                        <button disabled className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-300">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 pb-8">
                {[
                    { label: "Total Collections", value: collections.length.toString(), sub: "+2 new", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Active", value: collections.filter(c => c.status === "Active").length.toString(), sub: "visible", subColor: "text-[#3F6136] bg-[#E9F4E5]" },
                    { label: "Total Products", value: collections.reduce((a, c) => a + c.products, 0).toString(), sub: "across all", subColor: "text-blue-600 bg-blue-50" },
                    { label: "Inactive", value: collections.filter(c => c.status !== "Active").length.toString(), sub: "hidden", subColor: "text-stone-500 bg-stone-100" },
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
