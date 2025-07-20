import Logo from "@/assets/svgs/Logo";
import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-[#090807] border-t border-[#7c3f00] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center">
          <div className="text-4xl text-[#7c3f00] font-black">
            <Logo />
          </div>
          <p className="text-gray-600 mt-3 max-w-md text-sm sm:text-base">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-[#7c3f00]" />

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-800 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
