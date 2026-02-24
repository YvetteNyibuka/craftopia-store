"use client";

import Link from "next/link";

import { Eye, Save, Image as ImageIcon, Settings, GripVertical, ChevronRight, Plus } from "lucide-react";

export default function ContentManagerPage() {
    return (
        <main className="max-w-[900px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div>
                    <div className="flex items-center text-[11px] text-[#5CE614] font-bold tracking-widest uppercase mb-1">
                        <Link href="/admin" className="hover:opacity-80 transition-opacity">Admin</Link>
                        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-stone-300" />
                        <Link href="/admin/website" className="hover:opacity-80 transition-opacity">Website</Link>
                        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-stone-300" />
                        <span className="text-[#111]">Homepage</span>
                    </div>
                    <h1 className="text-[32px] font-bold text-[#111] tracking-tight">Content Manager</h1>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 h-10 rounded-full bg-[#F4F5F6] text-[13px] font-bold text-[#111] hover:bg-stone-200 transition-colors">
                        <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-10 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[13px] shadow-sm transition-colors">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

            {/* Hero Banner Management */}
            <section className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-bold text-[#111] flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#5CE614]" /> Hero Banner Management
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Visible</span>
                        <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-[20px] p-4 border border-stone-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-[#5CE614] text-[#111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">Active</span>
                        </div>
                        <div className="relative aspect-[2/1] bg-[#F2EDE7] rounded-[14px] mb-4 overflow-hidden border border-stone-100 flex items-center justify-end pr-8">
                            <div className="absolute inset-0 bg-stone-200 mix-blend-multiply opacity-30"></div>
                            {/* Mock banner graphic representation */}
                            <div className="w-1/3 h-full bg-stone-300 rounded-l-full relative opacity-50 blur-sm"></div>
                            <div className="absolute bottom-4 left-8 text-white z-20"></div>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#111]">Spring Renewal Collection</h3>
                        <p className="text-[13px] text-stone-500 mt-0.5">Link: /collections/spring-24</p>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-[20px] p-6 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-stone-50 hover:border-stone-300 transition-colors">
                        <div className="w-12 h-12 bg-[#E9F4E5] rounded-full flex items-center justify-center text-[#5CE614] mb-4">
                            <ImageIcon className="w-5 h-5" />
                            <div className="absolute mt-5 ml-5 bg-white rounded-full"><Plus className="w-3 h-3 text-[#5CE614]" /></div>
                        </div>
                        <h3 className="text-[14px] font-bold text-[#111]">Add New Banner</h3>
                        <p className="text-[12px] text-stone-500 mt-1">Recommended size: 1920 × 600px</p>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-bold text-[#111] flex items-center gap-2">
                        <div className="flex flex-col gap-1 w-5">
                            <div className="h-0.5 w-full bg-[#5CE614] rounded-full"></div>
                            <div className="h-0.5 w-full bg-[#5CE614] rounded-full"></div>
                            <div className="h-0.5 w-full bg-[#5CE614] rounded-full"></div>
                        </div>
                        Featured Collections
                    </h2>
                    <span className="text-[13px] text-stone-400">Drag to reorder sections on the homepage</span>
                </div>

                <div className="space-y-3 mb-6">
                    {/* Collection 1 */}
                    <div className="bg-white rounded-[20px] p-4 border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="text-stone-300 cursor-grab px-2">
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 bg-[#F2EDE7] rounded-[10px] overflow-hidden flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[14px] font-bold text-[#111]">Handcrafted Vases</h3>
                            <p className="text-[12px] text-stone-500 mt-0.5">12 Products • Updated 2 days ago</p>
                        </div>
                        <div className="flex items-center gap-5 px-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Visible</span>
                                <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                </div>
                            </div>
                            <button className="text-stone-400 hover:text-stone-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Collection 2 */}
                    <div className="bg-white rounded-[20px] p-4 border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="text-stone-300 cursor-grab px-2">
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 bg-[#F9EAEA] rounded-[10px] overflow-hidden flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-red-900/5 mix-blend-multiply"></div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[14px] font-bold text-[#111]">Summer Bouquets</h3>
                            <p className="text-[12px] text-stone-500 mt-0.5">24 Products • Updated 1 week ago</p>
                        </div>
                        <div className="flex items-center gap-5 px-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Visible</span>
                                <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                </div>
                            </div>
                            <button className="text-stone-400 hover:text-stone-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Collection 3 */}
                    <div className="bg-white rounded-[20px] p-4 border border-stone-200 shadow-sm flex items-center gap-4 opacity-75">
                        <div className="text-stone-300 cursor-grab px-2">
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 bg-[#EADCC3] rounded-[10px] overflow-hidden flex-shrink-0 relative">
                            <div className="absolute inset-x-3 bottom-0 top-3 rounded-t-[20px] bg-[#C1A881]"></div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[14px] font-bold text-[#111]">Minimalist Wall Art</h3>
                            <p className="text-[12px] text-stone-500 mt-0.5">8 Products • Updated 5 days ago</p>
                        </div>
                        <div className="flex items-center gap-5 px-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Visible</span>
                                <div className="w-10 h-5 bg-stone-200 rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                                </div>
                            </div>
                            <button className="text-stone-400 hover:text-stone-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <button className="w-full h-[52px] rounded-[14px] border border-dashed border-stone-300 text-[13px] font-bold text-stone-500 hover:text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-all">
                    + Add Featured Collection Slot
                </button>
            </section>

            {/* Section Visibility Summary */}
            <section>
                <h2 className="text-[18px] font-bold text-[#111] mb-4">Section Visibility Summary</h2>
                <div className="bg-[#FAF9F6] rounded-[20px] p-6 border border-stone-100 shadow-sm flex flex-wrap gap-4 md:gap-8 justify-between">

                    <div className="flex items-center justify-between flex-1 min-w-[200px] bg-white rounded-xl p-4 border border-stone-100">
                        <span className="text-[13px] font-bold text-[#111]">Newsletter Popup</span>
                        <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-1 min-w-[200px] bg-white rounded-xl p-4 border border-stone-100">
                        <span className="text-[13px] font-bold text-[#111]">Instagram Feed</span>
                        <div className="w-10 h-5 bg-[#3B82F6] rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-1 min-w-[200px] bg-white rounded-xl p-4 border border-stone-100 opacity-75">
                        <span className="text-[13px] font-bold text-[#111]">Customer Reviews</span>
                        <div className="w-10 h-5 bg-stone-200 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                        </div>
                    </div>

                </div>
            </section>

            <div className="h-16"></div>
        </main>
    );
}
