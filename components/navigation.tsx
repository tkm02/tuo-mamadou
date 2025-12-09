"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "À Propos", href: "#about" },
    { label: "Compétences", href: "#skills" },
    { label: "Expérience", href: "#experience" },
    { label: "Projets", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Gallerie Professionnelle", href: "#gallery" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      style={{ overflowX: "hidden" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="inline-flex items-center">
            <img
              id="mon-logo"
              src="/logo.png"
              alt="Logo"
              className="w-13 h-13 rounded-full object-cover border-2 border-white"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border overflow-x-hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 px-2 text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
