import Link from "next/link";
import Image from "next/image";

export function PublicFooter() {
    return (
        <footer className="bg-[#111] text-white py-16 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

                    {/* Brand column */}
                    <div className="md:col-span-2">
                        {/* Icon + wordmark on dark bg */}
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden border border-white/10">
                                <Image
                                    src="/CraftopiaLogo/IconLogo.png"
                                    alt="Craftopia icon"
                                    width={36}
                                    height={36}
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <span className="font-serif text-[20px] font-semibold tracking-tight text-white group-hover:text-[#5CE614] transition-colors">
                                Craftopia
                            </span>
                        </Link>
                        <p className="text-stone-400 leading-relaxed text-[14px] max-w-xs">
                            Curating nature's elegance and artisanal beauty for your living space — one hand-picked piece at a time.
                        </p>
                        {/* Social icons */}
                        <div className="flex items-center gap-3 mt-6">
                            {["In", "Pi", "Tk"].map((s, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:border-[#5CE614] hover:text-[#5CE614] transition-colors text-[11px] font-bold"
                                >
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-stone-300">Shop</h4>
                        <ul className="space-y-3 text-stone-400">
                            <li><Link href="/shop" className="hover:text-white transition-colors">Fresh Flowers</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">Dried Florals</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">Artificial</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">Vases & Planters</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-stone-300">Company</h4>
                        <ul className="space-y-3 text-stone-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-stone-300">Legal</h4>
                        <ul className="space-y-3 text-stone-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Cookie Preferences</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-stone-500 text-[13px]">© 2024 Craftopia. All rights reserved.</p>
                    <p className="text-stone-600 text-[12px] italic">Crafted Beauty for Every Space.</p>
                </div>
            </div>
        </footer>
    );
}
