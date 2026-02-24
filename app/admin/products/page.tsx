"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Plus, Filter, LayoutGrid, List, ChevronRight, ChevronLeft, MoreHorizontal, AlertTriangle, AlertCircle, Pencil, Trash2 } from "lucide-react";
import { ProductFormDrawer, type ProductFormData } from "@/components/admin/ProductFormDrawer";

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Ethereal White Roses",
        updatedAt: "Last updated 2h ago",
        sku: "FLR-2024-001",
        category: "Floral Arrangements",
        categoryClass: "bg-blue-50 text-blue-600",
        price: "$85.00",
        priceNum: 85,
        stockLevel: "In Stock",
        units: 42,
        stockClass: "text-[#5CE614]",
        barWidth: "60%",
        barColor: "bg-[#5CE614]",
        image: "/images/decors/Image1.jpeg",
    },
    {
        id: 2,
        name: "Rustic Lavender Bundle",
        updatedAt: "Last updated 5h ago",
        sku: "DRY-2024-012",
        category: "Dried Flowers",
        categoryClass: "bg-purple-50 text-purple-600",
        price: "$32.00",
        priceNum: 32,
        stockLevel: "Low Stock",
        units: 8,
        stockClass: "text-[#F5A623]",
        barWidth: "15%",
        barColor: "bg-[#F5A623]",
        image: "/images/decors/image2.jpeg",
    },
    {
        id: 3,
        name: "Minimalist Ceramic Vase",
        updatedAt: "Last updated 1d ago",
        sku: "DCR-2024-055",
        category: "Home Décor",
        categoryClass: "bg-orange-50 text-orange-600",
        price: "$45.00",
        priceNum: 45,
        stockLevel: "In Stock",
        units: 120,
        stockClass: "text-[#5CE614]",
        barWidth: "100%",
        barColor: "bg-[#5CE614]",
        image: "/images/decors/Image3.jpeg",
    },
    {
        id: 4,
        name: "Golden Pampas Grass",
        updatedAt: "Last updated 12h ago",
        sku: "DRY-2024-098",
        category: "Dried Flowers",
        categoryClass: "bg-purple-50 text-purple-600",
        price: "$28.00",
        priceNum: 28,
        stockLevel: "Out of Stock",
        units: 0,
        stockClass: "text-[#D0021B]",
        barWidth: "0%",
        barColor: "bg-transparent",
        image: "/images/decors/Image4.jpeg",
    },
];

export default function AdminInventoryPage() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);

    // ── Drawer state ─────────────────────────────────────────────────────
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Partial<ProductFormData> | null>(null);

    const openCreate = () => {
        setEditTarget(null);
        setDrawerOpen(true);
    };

    const openEdit = (p: typeof INITIAL_PRODUCTS[number]) => {
        setEditTarget({
            id: p.id,
            title: p.name,
            slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            category: p.category,
            sku: p.sku,
            price: p.priceNum.toString(),
            stockCount: p.units.toString(),
            isActive: true,
            trackInventory: true,
        });
        setDrawerOpen(true);
    };

    const handleSave = (data: ProductFormData) => {
        if (data.id) {
            setProducts((ps) =>
                ps.map((p) =>
                    p.id === data.id
                        ? {
                            ...p,
                            name: data.title,
                            sku: data.sku || p.sku,
                            price: `$${parseFloat(data.price || "0").toFixed(2)}`,
                            priceNum: parseFloat(data.price || "0"),
                            updatedAt: "Just now",
                        }
                        : p
                )
            );
        } else {
            setProducts((ps) => [
                ...ps,
                {
                    id: Date.now(),
                    name: data.title,
                    updatedAt: "Just now",
                    sku: data.sku || "N/A",
                    category: data.category,
                    categoryClass: "bg-stone-100 text-stone-600",
                    price: `$${parseFloat(data.price || "0").toFixed(2)}`,
                    priceNum: parseFloat(data.price || "0"),
                    stockLevel: parseInt(data.stockCount || "0") > 0 ? "In Stock" : "Out of Stock",
                    units: parseInt(data.stockCount || "0"),
                    stockClass: parseInt(data.stockCount || "0") > 0 ? "text-[#5CE614]" : "text-[#D0021B]",
                    barWidth: `${Math.min(100, parseInt(data.stockCount || "0"))}%`,
                    barColor: parseInt(data.stockCount || "0") > 0 ? "bg-[#5CE614]" : "bg-transparent",
                    image: "/images/decors/Image1.jpeg",
                },
            ]);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Delete this product?")) {
            setProducts((ps) => ps.filter((p) => p.id !== id));
        }
    };

    return (
        <>
            {/* ── Product Form Drawer ────────────────────────────────── */}
            <ProductFormDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                initial={editTarget}
                onSave={handleSave}
            />

            <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center text-[13px] text-stone-500 font-medium">
                    <Link href="/admin" className="hover:text-[#111] transition-colors">Admin</Link>
                    <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-300" />
                    <span className="text-[#111] font-semibold">Product Inventory</span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-2">Product Inventory</h1>
                        <p className="text-[15px] text-stone-500">Manage your floral arrangements, dried flowers, and home décor catalog.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-[14px] font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <button
                            id="btn-new-product"
                            onClick={openCreate}
                            className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] shadow-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add New Product
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="bg-white rounded-[20px] p-3 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                        <button className="flex items-center justify-between min-w-[130px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors">
                            <span className="flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> Status: All</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                        <button className="flex items-center justify-between min-w-[120px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors">
                            <span>Category</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                        <button className="flex items-center justify-between min-w-[140px] px-4 h-10 rounded-xl border border-stone-200 bg-white text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors">
                            <span>Price Range</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                        <button className="text-[13px] font-bold text-[#5CE614] hover:text-[#4BD600] px-2 whitespace-nowrap transition-colors">
                            Clear Filters
                        </button>
                    </div>

                    <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end px-2">
                        <span className="text-[13px] text-stone-500 font-medium whitespace-nowrap">
                            Showing 1–{products.length} of {products.length} products
                        </span>
                        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl">
                            <button className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-stone-700">
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors">
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-[24px] border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="border-b border-stone-100 bg-white">
                                    <th className="py-5 px-6 opacity-0 w-[60px]"><input type="checkbox" /></th>
                                    <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[30%]">Product Name</th>
                                    <th className="py-5 px-4 text-[13px] font-bold text-stone-600">SKU</th>
                                    <th className="py-5 px-4 text-[13px] font-bold text-stone-600">Category</th>
                                    <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[120px]">Price</th>
                                    <th className="py-5 px-4 text-[13px] font-bold text-stone-600 w-[200px]">Stock Level</th>
                                    <th className="py-5 px-6 text-[13px] font-bold text-stone-600 text-right w-[120px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-stone-50/50 transition-colors bg-white group">
                                        <td className="py-4 px-6 relative">
                                            <div className="absolute inset-y-0 left-6 flex items-center">
                                                <div className="w-[18px] h-[18px] rounded-md border-2 border-stone-200 hover:border-[#5CE614] bg-white cursor-pointer transition-colors" />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl border border-stone-100 overflow-hidden flex-shrink-0 relative">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover object-center" />
                                                </div>
                                                <div>
                                                    <h3 className="text-[14px] font-bold text-[#111]">{product.name}</h3>
                                                    <p className="text-[11px] text-stone-400 mt-0.5">{product.updatedAt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[13px] font-medium text-stone-500 tracking-wide font-mono">{product.sku}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${product.categoryClass}`}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-[15px] font-bold text-[#111]">{product.price}</span>
                                        </td>
                                        <td className="py-4 px-4 pr-10">
                                            <div className="flex justify-between items-center text-[11px] font-bold mb-1.5">
                                                <span className={product.stockClass}>{product.stockLevel}</span>
                                                <span className="text-[#111]">{product.units} units</span>
                                            </div>
                                            <div className="w-full h-[5px] bg-stone-100 rounded-full relative overflow-hidden">
                                                {product.units > 0 && (
                                                    <div className={`absolute top-0 left-0 h-full rounded-full ${product.barColor}`} style={{ width: product.barWidth }} />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(product)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="border-t border-stone-100 px-6 py-5 flex items-center justify-between bg-white">
                        <span className="text-[14px] font-medium text-stone-500">Page 1 of 1</span>
                        <div className="flex items-center gap-2">
                            <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-50 disabled:opacity-50">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-[#5CE614] text-[#111] font-bold text-[13px] flex items-center justify-center">1</button>
                            <button className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 pb-16">
                    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-[13px] font-bold text-stone-500">Total Products</h3>
                            <span className="text-[11px] font-bold text-[#3F6136] bg-[#E9F4E5] px-2 py-0.5 rounded-full">+{products.length} new</span>
                        </div>
                        <div className="text-[32px] font-bold text-[#111]">{products.length}</div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-[13px] font-bold text-stone-500 mb-2">Total Stock Value</h3>
                        <div className="text-[32px] font-bold text-[#111]">${products.reduce((a, p) => a + p.priceNum * p.units, 0).toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm border-l-4 border-l-[#F5A623] hover:shadow-md transition-shadow">
                        <h3 className="text-[13px] font-bold text-stone-500 mb-2">Low Stock Alerts</h3>
                        <div className="text-[32px] font-bold text-[#111] flex items-center gap-3">
                            {products.filter(p => p.units > 0 && p.units < 10).length}
                            <AlertTriangle className="w-6 h-6 text-[#F5A623] fill-[#FDF3E3]" />
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm border-l-4 border-l-[#D0021B] hover:shadow-md transition-shadow">
                        <h3 className="text-[13px] font-bold text-stone-500 mb-2">Out of Stock</h3>
                        <div className="text-[32px] font-bold text-[#111] flex items-center gap-3">
                            {products.filter(p => p.units === 0).length}
                            <AlertCircle className="w-6 h-6 text-[#D0021B] fill-[#FDE8E9]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
