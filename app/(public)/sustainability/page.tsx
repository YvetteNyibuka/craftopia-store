import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Wind, Droplets, Sun, Heart } from "lucide-react";

const pillars = [
    {
        icon: Leaf,
        title: "Ethically Sourced",
        desc: "Every stem, branch, and ceramic is sourced from farms and artisans who share our commitment to fair labour and environmental care.",
        color: "bg-[#E9F8E5]",
        iconColor: "text-[#5CE614]",
    },
    {
        icon: Recycle,
        title: "Zero-Waste Packaging",
        desc: "We use 100% compostable wrapping, soy-based inks, and recycled cardboard. No single-use plastics, ever.",
        color: "bg-[#E8F4FB]",
        iconColor: "text-blue-500",
    },
    {
        icon: Wind,
        title: "Carbon Neutral Delivery",
        desc: "We offset every delivery's carbon footprint through certified reforestation projects across Sub-Saharan Africa.",
        color: "bg-[#FDF3E3]",
        iconColor: "text-amber-500",
    },
    {
        icon: Droplets,
        title: "Water-Conscious Growing",
        desc: "Our partner farms use drip irrigation and rainwater harvesting, using up to 70% less water than conventional floral growers.",
        color: "bg-[#EDF4FF]",
        iconColor: "text-indigo-500",
    },
    {
        icon: Sun,
        title: "Solar-Powered Studios",
        desc: "Our arrangement studios and storage facilities run entirely on renewable solar energy.",
        color: "bg-[#FFF8E1]",
        iconColor: "text-yellow-500",
    },
    {
        icon: Heart,
        title: "Community First",
        desc: "We reinvest 5% of every sale into community gardens and botanical education programmes in local neighbourhoods.",
        color: "bg-[#FCE8F3]",
        iconColor: "text-pink-500",
    },
];

const stats = [
    { value: "12,000+", label: "Flowers sourced sustainably this year" },
    { value: "100%", label: "Compostable packaging since 2023" },
    { value: "420t", label: "CO₂ offset through reforestation" },
    { value: "38", label: "Artisan partner farms worldwide" },
];

export default function SustainabilityPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* ── Hero ── */}
            <section className="relative h-[75vh] flex items-end overflow-hidden">
                <Image
                    src="/images/decors/Image6.jpeg"
                    alt="Sustainability hero — lush greenery"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                <div className="relative z-10 container mx-auto px-6 pb-20">
                    <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-4">
                        Our Commitment
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.08] mb-6 max-w-3xl">
                        Nature Cares for Us.{" "}
                        <span className="italic font-light">We Care for Nature.</span>
                    </h1>
                    <p className="text-white/80 text-[17px] max-w-xl leading-relaxed">
                        Sustainability isn't a product feature — it's the foundation of everything we do, from seed to doorstep.
                    </p>
                </div>
            </section>

            {/* ── Stats Banner ── */}
            <section className="bg-[#111] py-14">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-[#5CE614] text-[40px] font-bold leading-none mb-2">{s.value}</p>
                                <p className="text-white/60 text-[13px] leading-snug">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Our Story ── */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text */}
                        <div className="w-full lg:w-1/2">
                            <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-4">Our Story</p>
                            <h2 className="font-serif text-4xl font-medium text-[#111] mb-6 italic leading-tight">
                                Born from a Belief <br />That Beauty Shouldn't Cost the Earth
                            </h2>
                            <p className="text-stone-500 leading-relaxed text-[15px] mb-6">
                                Floral & Home was founded in 2019 with a single principle: that the most beautiful spaces are built in harmony with the natural world. We quickly realised that the conventional floral industry — long-haul air freight, chemical pesticides, excessive packaging — was at odds with that principle.
                            </p>
                            <p className="text-stone-500 leading-relaxed text-[15px] mb-8">
                                So we rebuilt our supply chain from the ground up. We partnered with small-scale farms within 500km of our studio, trained in regenerative growing practices. We replaced every piece of plastic with plant-based alternatives. And we committed to measuring, reducing, and offsetting every gram of carbon we produce.
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] uppercase tracking-widest border-b border-[#111] hover:text-[#5CE614] hover:border-[#5CE614] pb-1 transition-colors"
                            >
                                Read our full story <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Image stack */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-lg">
                                <Image
                                    src="/images/decors/Image5.jpeg"
                                    alt="Sustainable sourcing"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            {/* floating card */}
                            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-5 max-w-[210px] hidden md:block">
                                <div className="w-8 h-8 bg-[#E9F8E5] rounded-full flex items-center justify-center text-[#5CE614] mb-3">
                                    <Leaf className="w-4 h-4" />
                                </div>
                                <p className="text-[13px] font-bold text-[#111] leading-snug">Certified B-Corp Partner</p>
                                <p className="text-[11px] text-stone-400 mt-1">Verified sustainable supply chain</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6 Pillars ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-14">
                        <p className="text-[#5CE614] text-[11px] font-bold tracking-widest uppercase mb-3">How We Do It</p>
                        <h2 className="font-serif text-4xl font-medium text-[#111] italic">Our Six Sustainability Pillars</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {pillars.map((p) => (
                            <div
                                key={p.title}
                                className="bg-[#FAFAFA] rounded-3xl p-8 border border-stone-100 hover:shadow-md transition-shadow"
                            >
                                <div className={`w-12 h-12 ${p.color} rounded-2xl flex items-center justify-center ${p.iconColor} mb-5`}>
                                    <p.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-[17px] font-bold text-[#111] mb-3">{p.title}</h3>
                                <p className="text-stone-500 text-[14px] leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Photo Feature ── */}
            <section className="py-24 bg-[#FAF9F6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-14">
                        {[
                            "/images/decors/Image1.jpeg",
                            "/images/decors/Image3.jpeg",
                            "/images/decors/Image4.jpeg",
                            "/images/decors/Image7.jpeg",
                            "/images/decors/Image8.jpeg",
                            "/images/decors/Image9.jpeg",
                        ].map((src, i) => (
                            <div
                                key={i}
                                className={`relative rounded-3xl overflow-hidden ${i === 0 || i === 5 ? "aspect-[4/3]" : "aspect-square"}`}
                            >
                                <Image
                                    src={src}
                                    alt={`Sustainability visual ${i + 1}`}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-stone-400 text-[13px] italic">
                        Photos taken at our partner farms — no filters, no staging. Just honest beauty.
                    </p>
                </div>
            </section>

            {/* ── Pledge CTA ── */}
            <section className="py-24 bg-[#E9F8E5]">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <div className="w-14 h-14 bg-[#5CE614] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="font-serif text-4xl font-medium text-[#1C3A16] mb-4 italic">
                        Join the Pledge
                    </h2>
                    <p className="text-[#3F6136] text-[15px] leading-relaxed mb-10">
                        For every order placed, we plant one tree in partnership with Trees for the Future. Add your footprint to our growing forest — one stem at a time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/shop"
                            className="flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#5CE614] hover:bg-[#4BD600] text-[#111] font-bold text-[14px] transition-colors shadow-sm"
                        >
                            Shop & Plant a Tree <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center justify-center gap-2 px-8 h-12 rounded-full border border-[#3F6136] text-[#3F6136] font-bold text-[14px] hover:bg-white/60 transition-colors"
                        >
                            Learn About Our Partners
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
