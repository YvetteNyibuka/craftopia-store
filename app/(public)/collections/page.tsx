"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart, Star } from "lucide-react";
import { products } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";

const categories = [
    { name: "All", slug: "all" },
    { name: "Fresh Flowers", slug: "Fresh Flowers" },
    { name: "Dried Florals", slug: "Dried Florals" },
    { name: "Artificial", slug: "Artificial" },
    { name: "Vases", slug: "Vases" },
    { name: "Planters", slug: "Planters" },
    { name: "Wall Decor", slug: "Wall Decor" },
];

const collectionBanners = [
    {
        title: "Natural Flowers",
        sub: "The Freshness of Spring",
        img: "/images/decors/Image1.jpeg",
        count: "24 pieces",
        slug: "fresh-flowers",
    },
    {
        title: "Dried Florals",
        sub: "Everlasting, Earthy Beauty",
        img: "/images/decors/Image3.jpeg",
        count: "18 pieces",
        slug: "dried-florals",
    },
    {
        title: "Greenery & Planters",
        sub: "Lush Indoor Oases",
        img: "/images/decors/Image6.jpeg",
        count: "12 pieces",
        slug: "planters",
    },
    {
        title: "Minimal Home Décor",
        sub: "Custom Pottery & Ceramics",
        img: "/images/decors/Image9.jpeg",
        count: "31 pieces",
        slug: "home-decor",
    },
];

export default function CollectionsPage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered =
        activeCategory === "all"
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ── */}
            <section className="relative h-[60vh] flex items-end overflow-hidden">
                <Image
                    src="/images/decors/Image10.jpeg"
                    alt="Collections hero"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 container mx-auto px-6 pb-16">
                    <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">
                        Our Collections
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-white leading-tight mb-4">
                        Curated for <span className="italic font-light">Your Space</span>
                    </h1>
                    <p className="text-white/80 text-[16px] max-w-lg">
                        Explore our hand-picked botanical and home décor collections — each crafted with intention and quiet beauty.
                    </p>
                </div>
            </section>

            {/* ── Collection Banners ── */}
            <section className="py-20 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collectionBanners.map((col) => (
                            <Link
                                key={col.slug}
                                href={`/shop?category=${col.slug}`}
                                className="group relative h-[380px] rounded-3xl overflow-hidden block"
                            >
                                <Image
                                    src={col.img}
                                    alt={col.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-[#5CE614] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        {col.count}
                                    </p>
                                    <h3 className="font-bold text-[18px] text-white mb-0.5">{col.title}</h3>
                                    <p className="text-white/70 text-[13px]">{col.sub}</p>
                                    <div className="mt-4 flex items-center gap-1 text-[#5CE614] text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Shop now <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── All Products ── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    {/* Header + Tabs */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                        <div>
                            <h2 className="font-serif text-3xl font-medium text-[#111] mb-2">
                                Browse All Pieces
                            </h2>
                            <p className="text-stone-500 text-[15px]">
                                {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
                            </p>
                        </div>

                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${activeCategory === cat.slug
                                            ? "bg-[#5CE614] text-[#111] shadow-sm"
                                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {filtered.map((product) => (
                            <div
                                key={product.id}
                                className="group flex flex-col bg-white rounded-[24px] border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative aspect-[4/5] rounded-t-[24px] overflow-hidden bg-stone-100">
                                    <Link href={`/shop/${product.slug}`} className="absolute inset-0">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>
                                    <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-stone-400 hover:text-red-400 transition-colors z-10">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                    {product.isBestSeller && (
                                        <span className="absolute top-4 left-4 bg-[#5CE614] text-[#111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                                            Best Seller
                                        </span>
                                    )}
                                    {product.isNew && !product.isBestSeller && (
                                        <span className="absolute top-4 left-4 bg-white text-[#111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 shadow-sm">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                                        {product.category}
                                    </span>
                                    <Link href={`/shop/${product.slug}`}>
                                        <h3 className="font-semibold text-[15px] text-[#111] group-hover:text-[#5CE614] transition-colors leading-tight mb-1">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-1 mb-3">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        <span className="text-[12px] font-semibold text-stone-600">{product.rating.toFixed(1)}</span>
                                        <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <p className="font-bold text-[18px] text-[#111]">{formatCurrency(product.price)}</p>
                                        <Link
                                            href={`/shop/${product.slug}`}
                                            className="text-[12px] font-bold text-[#5CE614] hover:text-[#4BD600] transition-colors flex items-center gap-1"
                                        >
                                            View <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Curated Picks Banner ── */}
            <section className="py-20 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="relative rounded-[32px] overflow-hidden h-[340px]">
                        <Image
                            src="/images/decors/Image7.jpeg"
                            alt="Curated picks"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">Editor's Choice</p>
                            <h2 className="font-serif text-4xl font-medium text-white mb-4 italic">
                                Curated Picks of the Season
                            </h2>
                            <p className="text-white/75 text-[15px] max-w-md mb-8">
                                Our botanical experts hand-select the finest pieces each season for your home.
                            </p>
                            <Link
                                href="/shop"
                                className="flex items-center gap-2 px-8 h-12 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] transition-colors shadow-sm"
                            >
                                Shop the Edit <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
