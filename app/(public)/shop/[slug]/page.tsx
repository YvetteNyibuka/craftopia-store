import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Heart, Star, ChevronRight, CheckCircle2, Settings, ArrowRight } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products.find(p => p.slug === slug);

    const displayProduct = product || products[0];
    const relatedProducts = products.filter(p => p.id !== displayProduct.id).slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-xs text-muted-foreground mb-8">
                <Link href="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="h-3 w-3 mx-2" />
                <Link href="/shop" className="hover:text-foreground">{displayProduct.category}</Link>
                <ChevronRight className="h-3 w-3 mx-2" />
                <span className="text-foreground font-medium">{displayProduct.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24">
                {/* Gallery */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="relative aspect-[4/5] bg-[#F4F1EA] rounded-2xl overflow-hidden shadow-sm">
                        <Image
                            src={displayProduct.images[0]}
                            alt={displayProduct.title}
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-stone-50 transition-colors z-10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                        </button>
                    </div>
                    {/* thumbnail strip — cycle through other decor images as alternate angles */}
                    <div className="grid grid-cols-4 gap-4">
                        {["/images/decors/Image8.jpeg", "/images/decors/Image9.jpeg", "/images/decors/Image10.jpeg"].map((src, i) => (
                            <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow ${i === 0 ? 'ring-2 ring-[#5CE614]' : ''}`}>
                                <div className="relative w-full h-full">
                                    <Image src={src} alt={`View ${i + 2}`} fill className="object-cover object-center" />
                                </div>
                            </div>
                        ))}
                        <div className="aspect-square bg-[#F5F5F5] rounded-xl flex items-center justify-center cursor-pointer shadow-sm hover:bg-stone-200 transition-colors">
                            <div className="text-center">
                                <p className="text-[11px] font-bold text-stone-500">+{relatedProducts.length}</p>
                                <p className="text-[10px] text-stone-400">more</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 pt-2">
                    <span className="text-[#5CE614] text-[10px] font-bold tracking-widest uppercase mb-3 block">
                        {displayProduct.isBestSeller ? 'Artisan Collection' : displayProduct.category}
                    </span>
                    <h1 className="font-serif text-4xl lg:text-[44px] font-medium mb-4 text-[#111] leading-tight">
                        {displayProduct.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[26px] font-normal text-stone-600">
                            {formatCurrency(displayProduct.price)}
                        </span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-3 w-3 ${star <= Math.floor(displayProduct.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
                                />
                            ))}
                            <span className="text-xs text-stone-500 ml-1">({displayProduct.reviewsCount} reviews)</span>
                        </div>
                    </div>

                    <div className="bg-[#FAF9F6] p-6 rounded-2xl mb-8 border border-stone-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5CE614]"></div>
                        <h3 className="text-[13px] font-bold text-[#111] mb-2 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5CE614" strokeWidth="2.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                            The Story
                        </h3>
                        <p className="text-[14px] italic text-stone-600 leading-relaxed font-serif">
                            "{displayProduct.description}"
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-3">Arrangement Size</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="py-2.5 rounded-full border-2 border-[#5CE614] bg-[#5CE614]/5 text-[#3F6136] text-[13px] font-bold transition-colors">
                                Petite
                            </button>
                            <button className="py-2.5 rounded-full border border-stone-200 hover:border-stone-300 text-stone-600 text-[13px] font-medium transition-colors">
                                Standard
                            </button>
                            <button className="py-2.5 rounded-full border border-stone-200 hover:border-stone-300 text-stone-600 text-[13px] font-medium transition-colors">
                                Deluxe
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-3">Bottle Type</h3>
                        <div className="relative">
                            <select className="w-full h-12 rounded-lg border border-stone-200 px-4 text-[14px] text-[#111] font-medium bg-transparent outline-none focus:border-[#5CE614] transition-colors appearance-none">
                                <option>Vintage Amber Apothecary</option>
                                <option>Clear Glass Cylinder</option>
                                <option>Ceramic Minimalist White</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    {displayProduct.inStock && (
                        <div className="flex items-center justify-between bg-[#E9F4E5] px-4 py-3 rounded-xl mb-8 border border-[#c4eab7]">
                            <div className="flex items-center text-[#3F6136] text-[12px] font-semibold">
                                <CheckCircle2 className="h-4 w-4 mr-2 text-[#5CE614]" />
                                In Stock: {displayProduct.stockCount} units available
                            </div>
                            <button className="text-[10px] font-bold uppercase tracking-wider border border-[#b2e5a0] bg-white px-3 py-1 rounded hover:bg-stone-50 text-[#3F6136] hover:text-[#2A4720] flex items-center shadow-sm">
                                EDIT IN IMS
                            </button>
                        </div>
                    )}

                    <div className="flex gap-4 mb-8">
                        <AddToCartButton product={displayProduct} />
                        <button className="h-14 w-14 rounded-xl border border-stone-200 hover:bg-stone-50 flex items-center justify-center text-stone-500 hover:text-red-500 transition-colors bg-white shadow-sm flex-shrink-0">
                            <Heart className="h-5 w-5 fill-black" />
                        </button>
                    </div>

                    <div className="flex items-center gap-8 border-t border-stone-100 pt-6 mt-6">
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <svg className="w-4 h-4 mr-2 text-[#5CE614]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                            HAND-DELIVERED
                        </div>
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <svg className="w-4 h-4 mr-2 text-[#5CE614]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            SCHEDULE DELIVERY
                        </div>
                        <button className="ml-auto w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center hover:bg-[#333] transition-colors shadow-lg">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-stone-100 pt-16 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-2xl text-stone-700 font-medium">Complete the Aesthetic</h2>
                    <Link href="/collections" className="text-[#5CE614] text-xs font-bold uppercase tracking-wider hover:opacity-80 flex items-center">
                        View Entire Collection <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((p) => (
                        <Link key={p.id} href={`/shop/${p.slug}`} className="group block">
                            <div className="aspect-[3/4] rounded-2xl bg-[#F0EBE1] mb-4 overflow-hidden shadow-sm relative">
                                <Image
                                    src={p.images[0]}
                                    alt={p.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-semibold text-[13px] text-[#111] group-hover:text-primary transition-colors">{p.title}</h3>
                            <p className="text-stone-400 mt-1 text-xs">{formatCurrency(p.price)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
