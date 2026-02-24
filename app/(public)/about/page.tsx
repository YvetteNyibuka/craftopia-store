import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Star, Award, Users } from "lucide-react";

const values = [
    {
        icon: Leaf,
        title: "Rooted in Nature",
        desc: "Every piece we carry honours the natural world — its textures, colours, and quiet rhythms.",
        bg: "bg-[#E9F8E5]",
        color: "text-[#5CE614]",
    },
    {
        icon: Heart,
        title: "Crafted with Care",
        desc: "From grower to your door, each arrangement is handled with the same intention as the hands that made it.",
        bg: "bg-[#FDE8F0]",
        color: "text-pink-500",
    },
    {
        icon: Star,
        title: "Curated Quality",
        desc: "We say no to more than we say yes to. Only pieces that genuinely move us make the Craftopia edit.",
        bg: "bg-[#FDF3E3]",
        color: "text-amber-500",
    },
    {
        icon: Award,
        title: "Artisan Partnerships",
        desc: "We work directly with small-scale farms and independent ceramic artists across 14 countries.",
        bg: "bg-[#EDF4FF]",
        color: "text-blue-500",
    },
];

const team = [
    {
        name: "Amara Osei",
        role: "Co-Founder & Creative Director",
        img: "/images/decors/Image1.jpeg",
        bio: "Trained botanist turned creative director. Amara sources every fresh floral collection personally.",
    },
    {
        name: "Lena Müller",
        role: "Co-Founder & Head of Curation",
        img: "/images/decors/Image3.jpeg",
        bio: "Former interior stylist with 12 years in European design houses. Lena curates the ceramic and décor ranges.",
    },
    {
        name: "Kofi Asante",
        role: "Head of Sustainability",
        img: "/images/decors/Image6.jpeg",
        bio: "Environmental scientist ensuring our supply chain is as clean as our aesthetic.",
    },
];

const milestones = [
    { year: "2019", event: "Craftopia founded in a small Cairo studio with just 3 flower varieties." },
    { year: "2020", event: "Launched our first ceramic partnership with 5 independent potters." },
    { year: "2021", event: "Became carbon-neutral across all delivery routes." },
    { year: "2022", event: "Expanded to 8 countries. Crossed 10,000 happy homes served." },
    { year: "2023", event: "Launched zero-waste packaging across all product lines." },
    { year: "2024", event: "38 artisan farm partners. 50,000+ arrangements delivered." },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ── */}
            <section className="relative h-[70vh] flex items-end overflow-hidden">
                <Image
                    src="/images/decors/Image8.jpeg"
                    alt="About Craftopia"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                <div className="relative z-10 container mx-auto px-6 pb-16 max-w-4xl">
                    <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">Our Story</p>
                    <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.06] mb-5">
                        Beauty That <br />
                        <span className="italic font-light">Belongs</span> to Nature
                    </h1>
                    <p className="text-white/80 text-[17px] max-w-xl leading-relaxed">
                        Craftopia was born from a simple conviction: that the most beautiful spaces in the world draw their power from the natural world.
                    </p>
                </div>
            </section>

            {/* ── Origin Story ── */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="w-full lg:w-1/2">
                            <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-4">How It Began</p>
                            <h2 className="font-serif text-4xl font-medium text-[#111] mb-6 leading-tight italic">
                                A Studio, Two Friends, <br />and a Shared Obsession
                            </h2>
                            <p className="text-stone-500 text-[15px] leading-relaxed mb-5">
                                In 2019, Amara and Lena were styling a home in Cairo when they realised the market was flooded with mass-produced florals and generic home décor. Nothing had soul. Nothing felt alive.
                            </p>
                            <p className="text-stone-500 text-[15px] leading-relaxed mb-5">
                                They spent six months visiting farms, potters, and artists across Africa and Europe — building relationships with makers who worked slowly, ethically, and with extraordinary skill.
                            </p>
                            <p className="text-stone-500 text-[15px] leading-relaxed mb-8">
                                Craftopia launched with 3 flower varieties and 5 ceramic pieces. Today we partner with 38 artisan farms across 14 countries — but the founding obsession hasn't changed: every piece must have a story worth telling.
                            </p>
                            <Link
                                href="/sustainability"
                                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] uppercase tracking-widest border-b border-[#111] hover:text-[#5CE614] hover:border-[#5CE614] pb-1 transition-colors"
                            >
                                Our Sustainability Pledge <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Images */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
                                <Image src="/images/decors/Image5.jpeg" alt="Our studio" fill className="object-cover object-center" />
                            </div>
                            <div className="absolute -bottom-8 -left-6 w-48 h-48 rounded-2xl overflow-hidden border-8 border-[#FAF9F6] shadow-md hidden md:block">
                                <Image src="/images/decors/Image4.jpeg" alt="Detail" fill className="object-cover object-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-14">
                        <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">What We Stand For</p>
                        <h2 className="font-serif text-4xl font-medium text-[#111] italic">Our Four Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-[#FAFAFA] rounded-3xl p-7 border border-stone-100 hover:shadow-md transition-shadow">
                                <div className={`w-11 h-11 ${v.bg} rounded-2xl flex items-center justify-center ${v.color} mb-5`}>
                                    <v.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-[16px] font-bold text-[#111] mb-3">{v.title}</h3>
                                <p className="text-stone-500 text-[14px] leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-14">
                        <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">Our Journey</p>
                        <h2 className="font-serif text-4xl font-medium text-[#111] italic">Six Years of Quiet Growth</h2>
                    </div>
                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-stone-200" />
                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <div key={m.year} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5CE614] flex items-center justify-center z-10 shadow-sm">
                                        <span className="text-[10px] font-bold text-[#111]">{m.year.slice(2)}</span>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-stone-100 px-6 py-4 flex-1 shadow-sm">
                                        <p className="text-[12px] font-bold text-[#5CE614] uppercase tracking-widest mb-1">{m.year}</p>
                                        <p className="text-[14px] text-stone-600 leading-relaxed">{m.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-14">
                        <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">The Humans Behind It</p>
                        <h2 className="font-serif text-4xl font-medium text-[#111] italic">Meet the Team</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="group text-center">
                                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-md ring-4 ring-stone-100 group-hover:ring-[#5CE614] transition-all duration-300">
                                    <Image src={member.img} alt={member.name} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <h3 className="text-[17px] font-bold text-[#111] mb-1">{member.name}</h3>
                                <p className="text-[12px] font-bold text-[#5CE614] uppercase tracking-wider mb-3">{member.role}</p>
                                <p className="text-stone-500 text-[14px] leading-relaxed max-w-xs mx-auto">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats Banner ── */}
            <section className="py-16 bg-[#111]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { n: "50,000+", l: "Homes beautifully arranged" },
                            { n: "38", l: "Artisan farm partners" },
                            { n: "14", l: "Countries we source from" },
                            { n: "4.9★", l: "Average customer rating" },
                        ].map((s) => (
                            <div key={s.l}>
                                <p className="text-[#5CE614] text-[42px] font-bold leading-none mb-2">{s.n}</p>
                                <p className="text-white/60 text-[13px]">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 bg-[#E9F8E5]">
                <div className="container mx-auto px-6 max-w-xl text-center">
                    <Users className="w-10 h-10 text-[#5CE614] mx-auto mb-5" />
                    <h2 className="font-serif text-4xl font-medium text-[#1C3A16] mb-4 italic">Come Grow With Us</h2>
                    <p className="text-[#3F6136] text-[15px] mb-10 leading-relaxed">
                        Whether you're dressing your first apartment or your hundredth client, we'd love to be part of your story.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] transition-colors shadow-sm">
                            Shop the Collection <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/contact" className="flex items-center justify-center gap-2 px-8 h-12 rounded-full border border-[#3F6136] text-[#3F6136] font-bold text-[14px] hover:bg-white/60 transition-colors">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
