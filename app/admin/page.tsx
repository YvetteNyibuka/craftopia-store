import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, AlertTriangle, MoreHorizontal, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#111] mb-1 tracking-tight">Dashboard Overview</h1>
                <p className="text-sm text-stone-500">Welcome back! Here's what's happening with your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#E9F8E5] flex items-center justify-center text-[#5CE614]">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <div className="bg-[#E9F8E5] text-[#3F6136] px-2.5 py-1 rounded-full text-xs font-bold flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1 text-[#5CE614]" /> +12.5%
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-stone-500 mb-1">Total Revenue</p>
                    <h2 className="text-3xl font-bold text-[#111] mb-2">$42,500.00</h2>
                    <p className="text-xs text-stone-400">vs. $37,800 last month</p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
                            <ShoppingBag className="w-5 h-5 fill-current" />
                        </div>
                        <div className="bg-[#E9F8E5] text-[#3F6136] px-2.5 py-1 rounded-full text-xs font-bold flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1 text-[#5CE614]" /> +8.2%
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-stone-500 mb-1">Total Orders</p>
                    <h2 className="text-3xl font-bold text-[#111] mb-2">1,284</h2>
                    <p className="text-xs text-stone-400">Average order value: $33.10</p>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <AlertTriangle className="w-5 h-5 fill-amber-200 stroke-amber-600" />
                        </div>
                        <div className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center">
                            <ArrowDownRight className="w-3 h-3 mr-1" /> -5%
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-stone-500 mb-1">Low Stock Alerts</p>
                    <h2 className="text-3xl font-bold text-[#111] mb-2">12</h2>
                    <p className="text-xs text-stone-400">Requires immediate attention</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-stone-100 h-96 relative">
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <h2 className="font-bold text-lg text-[#111]">Monthly Sales Performance</h2>
                        <p className="text-sm text-stone-500">Revenue trends over the last 12 months</p>
                    </div>
                    <div className="px-5 py-2 rounded-full border border-stone-200 text-[13px] font-medium text-stone-600">Year 2024</div>
                </div>

                {/* Mock Chart representation */}
                <div className="absolute inset-x-8 bottom-12 top-24">
                    <div className="h-full w-full flex items-end">
                        <svg viewBox="0 0 1000 200" className="w-full h-full preserve-aspect-none drop-shadow-lg">
                            <path d="M0,180 C150,160 250,80 500,70 C700,60 850,-10 1000,50" fill="none" stroke="#5CE614" strokeWidth="4" strokeLinecap="round" />
                            <path d="M0,180 C150,160 250,80 500,70 C700,60 850,-10 1000,50 L1000,200 L0,200 Z" fill="url(#chartGradient)" />
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#5CE614" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#5CE614" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    {/* Axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-bold text-stone-400 tracking-wider translate-y-6">
                        <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                        <span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
                    </div>

                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 -z-10">
                        <div className="w-full h-[1px] bg-stone-100/0"></div>
                        <div className="w-full h-[1px] bg-stone-100"></div>
                        <div className="w-full h-[1px] bg-stone-100"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-stone-100 overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white">
                        <h2 className="font-bold text-lg text-[#111]">Recent Activity</h2>
                        <button className="text-sm font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors tracking-wide">View All</button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-stone-100 text-left text-xs font-bold text-stone-500 bg-stone-50/50">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            <tr className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-5 text-sm font-medium text-stone-600">Today, 10:42 AM</td>
                                <td className="px-6 py-5 text-sm font-bold text-[#111]">Order #9024 Placed</td>
                                <td className="px-6 py-5 text-sm text-stone-600">David Silva</td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700">Pending</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-5 text-sm font-medium text-stone-600">Yesterday, 3:15 PM</td>
                                <td className="px-6 py-5 text-sm font-bold text-[#111]">Inventory Updated</td>
                                <td className="px-6 py-5 text-sm text-stone-600">Admin</td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-green-50 text-green-700">Completed</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-5 text-sm font-medium text-stone-600">Mar 24, 9:20 AM</td>
                                <td className="px-6 py-5 text-sm font-bold text-[#111]">Order #9021 Delivered</td>
                                <td className="px-6 py-5 text-sm text-stone-600">Sarah Jenkins</td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600">Delivered</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-stone-100 p-6 overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg text-[#111]">Top Selling Products</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"><Filter className="w-3.5 h-3.5" /></button>
                            <button className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-4 px-2 pb-2 border-b border-stone-100">
                        <div className="col-span-2">Product</div>
                        <div className="text-right">Sold</div>
                        <div className="text-right border-l border-transparent hidden lg:block xl:hidden">Rev</div>
                        <div className="text-right lg:hidden xl:block">Revenue</div>
                    </div>
                    <div className="space-y-4 px-2">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0"></div>
                                <span className="text-[13px] font-bold text-[#111] truncate">Luna Vase</span>
                            </div>
                            <div className="text-right text-[13px] font-medium text-stone-600">245</div>
                            <div className="text-right text-[13px] font-bold text-[#5CE614]">{formatCurrency(245 * 89)}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0"></div>
                                <span className="text-[13px] font-bold text-[#111] truncate">Midnight Rose</span>
                            </div>
                            <div className="text-right text-[13px] font-medium text-stone-600">182</div>
                            <div className="text-right text-[13px] font-bold text-[#5CE614]">{formatCurrency(182 * 125)}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0"></div>
                                <span className="text-[13px] font-bold text-[#111] truncate">Pampas Bundle</span>
                            </div>
                            <div className="text-right text-[13px] font-medium text-stone-600">150</div>
                            <div className="text-right text-[13px] font-bold text-[#5CE614]">{formatCurrency(150 * 45)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
