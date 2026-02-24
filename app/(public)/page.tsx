"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/mockData";
import { formatCurrency } from "@/lib/utils/format";
import { ArrowRight } from "lucide-react";

const collections = [
    { title: "Natural Flowers", sub: "The Freshness of Spring", img: "/images/decors/Image1.jpeg" },
    { title: "Artificial", sub: "Everlasting Beauty", img: "/images/decors/image2.jpeg" },
    { title: "Greenery", sub: "Lush Indoor Oases", img: "/images/decors/Image6.jpeg" },
    { title: "Minimal Décor", sub: "Custom Pottery & Ceramics", img: "/images/decors/Image9.jpeg" },
];

export default function Home() {
    const newArrivals = products.filter(p => p.isNew).slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ── */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
                <Image
                    src="/images/decors/Image8.jpeg"
                    alt="Hero — floral home décor"
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/45" />

                <div className="container relative z-10 mx-auto px-6 flex flex-col items-start text-left max-w-4xl">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-white mb-6 leading-[1.1] drop-shadow-sm">
                        Bringing <span className="italic font-light">Nature</span> &amp; <br />
                        <span className="italic font-light">Art</span> Into Your Space
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-md mb-8 drop-shadow-sm">
                        Discover a curated collection of dried flowers and artisanal pottery designed to elevate your home with organic textures.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-[#5CE614] text-black hover:bg-[#4BD600] rounded-full font-bold px-8 shadow-none border-0">
                            SHOP NOW
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white/40 bg-white/10 hover:bg-white/20 rounded-full font-bold px-8 backdrop-blur-sm">
                            EXPLORE COLLECTIONS
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── Curated Collections ── */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
                        <div>
                            <h2 className="font-serif text-3xl font-medium mb-3 italic text-foreground">Curated Collections</h2>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Find the perfect botanical accents for every corner of your home.
                            </p>
                        </div>
                        <Link href="/collections" className="text-[#5CE614] text-xs font-bold tracking-wider uppercase flex items-center hover:opacity-80 transition-opacity">
                            VIEW ALL CATEGORIES <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collections.map((col) => (
                            <div key={col.title} className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                                <Image
                                    src={col.img}
                                    alt={col.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="font-bold text-xl mb-1 drop-shadow-sm">{col.title}</h3>
                                    <p className="text-sm opacity-90 drop-shadow-sm">{col.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mindful Arrangement ── */}
            <section className="py-24 bg-[#FAF9F6] border-y border-stone-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* image stack */}
                        <div className="w-full lg:w-1/2 relative pb-16 sm:pb-0">
                            <div className="relative h-[520px] w-full lg:w-[460px] rounded-2xl overflow-hidden shadow-md mx-auto lg:mr-auto lg:ml-0">
                                <Image
                                    src="/images/decors/Image10.jpeg"
                                    alt="Mindful arrangement"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            {/* floating accent image */}
                            <div className="absolute -bottom-8 -right-4 lg:-right-10 w-52 h-52 rounded-2xl border-8 border-[#FAF9F6] overflow-hidden z-10 hidden sm:block shadow-md">
                                <Image
                                    src="/images/decors/Image5.jpeg"
                                    alt="Detail accent"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 italic leading-[1.15] text-[#111]">
                                The Art of <br />Mindful Arrangement
                            </h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed text-[15px]">
                                We believe that every home should be a reflection of the natural world's quiet beauty. Our pieces are hand-selected for their unique character and organic origins.
                            </p>
                            <p className="text-muted-foreground mb-10 leading-relaxed text-[15px]">
                                From the subtle tones of sun-dried eucalyptus to the earthy textures of hand-fired stoneware, each element is designed to bring a sense of tranquility and artistry to your living space.
                            </p>
                            <Link href="/about" className="uppercase text-xs font-bold tracking-widest text-[#111] hover:text-[#5CE614] border-b border-[#111] hover:border-[#5CE614] pb-1 transition-colors">
                                OUR PHILOSOPHY <ArrowRight className="inline-block h-3 w-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── New Arrivals ── */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl font-medium mb-4 text-[#111]">New Arrivals</h2>
                    <div className="w-8 h-[2px] bg-[#5CE614] mx-auto mb-16" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                        {newArrivals.map(product => (
                            <Link key={product.id} href={`/shop/${product.slug}`} className="group block">
                                <div className="relative aspect-[3/4] bg-[#F5F5F5] rounded-2xl mb-5 overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="font-medium text-[#111] group-hover:text-[#5CE614] transition-colors text-[15px]">{product.title}</h3>
                                <p className="text-muted-foreground mt-1.5 text-sm">{formatCurrency(product.price)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Newsletter ── */}
            <section className="py-28 bg-[#E9F4E5]">
                <div className="container mx-auto px-4 max-w-xl text-center">
                    <div className="w-12 h-12 bg-[#5CE614] rounded-xl mx-auto mb-8 flex items-center justify-center text-white shadow-sm">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </div>
                    <h2 className="font-serif text-3xl font-medium mb-4 italic text-[#1C3A16]">Join Our Journal</h2>
                    <p className="text-[#3F6136] mb-10 text-[15px]">
                        Receive early access to new collections, botanical care tips, and exclusive offers delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 h-12 px-6 rounded-full border-0 focus:ring-2 focus:ring-[#5CE614] outline-none text-[#111] placeholder:text-stone-400 shadow-sm"
                            required
                        />
                        <Button className="h-12 bg-[#5CE614] hover:bg-[#4BD600] text-black font-bold rounded-full px-8 shadow-sm">
                            SUBSCRIBE
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}
