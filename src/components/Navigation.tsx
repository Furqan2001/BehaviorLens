"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Eye },
    { href: "/analyze", label: "Analyze", icon: Upload },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg shadow-slate-900/10">
      <div className="mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 transform transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-400/50">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-white tracking-tight">
                BehaviorLens
              </span>
              <span className="text-[11px] text-slate-400 font-medium -mt-0.5">
                Design Intelligence
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                    isActive
                      ? "text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{link.label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        duration: 0.4,
                        bounce: 0.2,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
