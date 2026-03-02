"use client";

import { useState, useEffect } from "react";
import {
  Download,
  Plus,
  LayoutGrid,
  List,
  ChevronRight,
  Pencil,
  Trash2,
  Loader2,
  Search,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  ProductFormDrawer,
  type ProductFormData,
} from "@/components/admin/ProductFormDrawer";
import { productsApi, ApiProduct } from "@/lib/api/products";
import { formatCurrency } from "@/lib/utils/format";
import { ApiError } from "@/lib/api/client";

type ViewMode = "grid" | "list";

const stockStyle = (count: number) => {
  if (count === 0)
    return {
      label: "Out of Stock",
      bar: "bg-red-400",
      barW: "5%",
      text: "text-red-500",
    };
  if (count <= 10)
    return {
      label: "Low Stock",
      bar: "bg-amber-400",
      barW: "20%",
      text: "text-amber-500",
    };
  if (count <= 30)
    return {
      label: "Limited",
      bar: "bg-blue-400",
      barW: "50%",
      text: "text-blue-500",
    };
  return {
    label: "In Stock",
    bar: "bg-[#5CE614]",
    barW: "85%",
    text: "text-[#5CE614]",
  };
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "active" | "inactive">(
    "",
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editInitial, setEditInitial] =
    useState<Partial<ProductFormData> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await productsApi.list({
        page,
        limit: 12,
        ...(search ? { search } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(res.pages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, statusFilter]); // eslint-disable-line

  const openNew = () => {
    setEditInitial(null);
    setDrawerOpen(true);
  };

  const openEdit = (p: ApiProduct) => {
    setEditInitial({
      id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      images: p.images || [],
      category: p.category,
      price: String(p.price),
      comparePrice: p.comparePrice ? String(p.comparePrice) : "",
      sku: p.sku ?? "",
      stockCount: String(p.stockCount),
      isActive: p.isActive,
      isNew: !!p.isNewProduct,
      isBestSeller: !!p.isBestSeller,
      tags: p.tags ?? [],
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    setDrawerOpen(false);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setTotal((t) => t - 1);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#111] tracking-tight mb-1">
            Products
          </h1>
          <p className="text-[15px] text-stone-500">
            {total} products in your catalogue
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 h-10 rounded-full border border-stone-200 text-sm font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-5 h-11 rounded-full border border-stone-200 text-sm font-semibold text-[#111] hover:bg-stone-50 transition-colors bg-white shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-6 h-11 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-sm shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[20px] p-3 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {(["", "active", "inactive"] as const).map((f) => (
            <button
              key={f || "all"}
              onClick={() => {
                setStatusFilter(f);
                setPage(1);
              }}
              className={`px-4 h-9 rounded-xl text-[13px] font-bold transition-colors ${statusFilter === f ? "bg-[#5CE614] text-black" : "border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            >
              {f ? (f === "active" ? "Active" : "Inactive") : "All"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  load();
                }
              }}
              className="w-full md:w-[240px] h-10 pl-9 pr-4 rounded-xl border border-stone-200 text-[13px] focus:outline-none focus:border-[#5CE614]"
            />
          </div>
          <div className="flex border border-stone-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setView("list")}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${view === "list" ? "bg-[#5CE614] text-black" : "hover:bg-stone-50 text-stone-400"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${view === "grid" ? "bg-[#5CE614] text-black" : "hover:bg-stone-50 text-stone-400"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#5CE614]" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[24px] border border-stone-100">
          <p className="text-stone-400 text-sm">
            No products found.{" "}
            <button onClick={openNew} className="text-[#5CE614] font-bold">
              Add your first product
            </button>
          </p>
        </div>
      ) : view === "list" ? (
        <div className="bg-white rounded-2xl sm:rounded-[24px] shadow-sm border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-stone-100 text-[11px] font-bold uppercase tracking-widest text-stone-400 bg-stone-50 text-left">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 sticky left-0 bg-stone-50 z-10">
                    Product
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">SKU</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Category</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Price</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Stock</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => {
                  const stock = stockStyle(p.stockCount);
                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-stone-50/50 transition-colors group"
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 sticky left-0 bg-white group-hover:bg-stone-50/50 z-10">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-stone-100 overflow-hidden shrink-0">
                            {p.images?.[0] && (
                              <img
                                src={p.images[0]}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] sm:text-[13px] font-bold text-[#111] line-clamp-1">
                              {p.title}
                            </p>
                            <p className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5">
                              Updated{" "}
                              {new Date(p.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-[12px] font-mono text-stone-400">
                        {p.sku ?? "—"}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 whitespace-nowrap">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-[13px] sm:text-[14px] font-bold text-[#111] whitespace-nowrap">
                        {formatCurrency(p.price)}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {p.stockCount <= 10 && (
                            <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
                          )}
                          <span
                            className={`text-[11px] sm:text-[12px] font-bold ${stock.text} whitespace-nowrap`}
                          >
                            {p.stockCount} units
                          </span>
                          <div className="hidden sm:block w-14 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${stock.bar}`}
                              style={{ width: stock.barW }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap ${p.isActive ? "bg-[#E9F8E5] text-[#3F6136]" : "bg-stone-100 text-stone-500"}`}
                        >
                          {p.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity justify-end">
                          <button
                            onClick={() => openEdit(p)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            disabled={deletingId === p._id}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-60"
                          >
                            {deletingId === p._id ? (
                              <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile scroll hint */}
          <div className="sm:hidden flex items-center justify-center gap-2 py-2 bg-stone-50 border-t border-stone-100">
            <p className="text-[10px] text-stone-400 font-medium">
              Scroll horizontally to see more →
            </p>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between">
              <p className="text-[13px] text-stone-500">
                Page {page} of {totalPages} · {total} products
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 h-9 rounded-xl border border-stone-200 text-[13px] font-bold text-stone-600 disabled:opacity-40 hover:bg-stone-50"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 h-9 rounded-xl border border-stone-200 text-[13px] font-bold text-stone-600 disabled:opacity-40 hover:bg-stone-50"
                >
                  Next <ChevronRight className="inline w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => {
            const stock = stockStyle(p.stockCount);
            return (
              <div
                key={p._id}
                className="bg-white rounded-[20px] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-md transition-all"
              >
                <div className="relative h-44 bg-stone-100">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(p)}
                      className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:bg-white shadow-sm"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                      className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:text-red-500 hover:bg-white shadow-sm disabled:opacity-60"
                    >
                      {deletingId === p._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {!p.isActive && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                    {p.category}
                  </p>
                  <p className="font-bold text-[14px] text-[#111] line-clamp-1 mb-2">
                    {p.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[16px] text-[#111]">
                      {formatCurrency(p.price)}
                    </span>
                    <span className={`text-[11px] font-bold ${stock.text}`}>
                      {stock.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProductFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initial={editInitial}
        onSave={handleSave}
      />
    </div>
  );
}
