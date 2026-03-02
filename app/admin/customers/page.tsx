"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils/format";
import { Download, ChevronRight, Loader2, Search, RefreshCw, Mail, MoreHorizontal } from "lucide-react";
import { customersApi, ApiCustomer } from "@/lib/api/orders";

const AVATAR_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-emerald-100 text-emerald-700",
];

const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<ApiCustomer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState<"" | "Active" | "Inactive">("");
    const [search, setSearch] = useState("");

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await customersApi.list({
                page,
                limit: 12,
                ...(statusFilter ? { status: statusFilter } : {}),
                ...(search ? { search } : {}),
            });
            setCustomers(res.data);
            setTotal(res.total);
            setTotalPages(res.pages);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { load(); }, [page, statusFilter]); // eslint-disable-line

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">Customers</h1>
                    <p className="text-[15px] text-stone-500">{total} registered users</p>
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
                <div className="flex items-center gap-2">
                    {(["", "Active", "Inactive"] as const).map((f) => (
                        <button
                            key={f || "all"}
                            onClick={() => { setStatusFilter(f); setPage(1); }}
                            className={`px-4 h-9 rounded-xl text-[13px] font-bold transition-colors ${statusFilter === f ? "bg-[#5CE614] text-black" : "border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                        >
                            {f || "All"}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search name or email…"
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
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Orders</th>
                            <th className="px-6 py-4">Total Spent</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Member Since</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {isLoading ? (
                            <tr><td colSpan={7} className="py-16 text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-[#5CE614] mx-auto" />
                            </td></tr>
                        ) : customers.length === 0 ? (
                            <tr><td colSpan={7} className="py-16 text-center text-stone-400 text-sm">No customers found.</td></tr>
                        ) : customers.map((c, idx) => (
                            <tr key={c._id} className="hover:bg-stone-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center text-[12px] font-bold flex-shrink-0`}>
                                            {initials(c.name)}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-[#111]">{c.name}</p>
                                            <p className="text-[12px] text-stone-400">{c.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-stone-500">{c.phone ?? "—"}</td>
                                <td className="px-6 py-4 text-[13px] font-bold text-[#111]">{c.ordersCount}</td>
                                <td className="px-6 py-4 text-[13px] font-bold text-[#5CE614]">{formatCurrency(c.totalSpent)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.status === "Active" ? "bg-[#5CE614]" : "bg-stone-300"}`} />
                                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.status === "Active" ? "bg-[#E9F8E5] text-[#3F6136]" : "bg-stone-100 text-stone-500"}`}>
                                            {c.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[13px] text-stone-400">
                                    {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors" title="Email">
                                            <Mail className="w-3.5 h-3.5" />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors" title="More">
                                            <MoreHorizontal className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
