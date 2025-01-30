"use client";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineShield } from "react-icons/md";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    {
      item: "Leaderboard",
      link: "/leaderboard",
    },
    {
      item: "Products",
      link: "#",
    },
    {
      item: "Monetization",
      link: "/research",
    },
    {
      item: "About",
      link: "/research",
    },
    {
      item: "Contact",
      link: "/research",
    },
    {
      item: "Admin",
      link: "/research",
    },
  ];
  return (
    <nav className="bg-[#121826] border-b border-gray-600  py-4 px-6 flex justify-around items-center">
      {/* Left Section: Logo */}
      <Link
        href="/"
        className="flex items-center gap-x-4 text-white font-semibold text-lg"
      >
        <MdOutlineShield className="w-6 h-6 text-[#477c73]" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#477c73] to-[#34548e]">
          VerifyInfluencers
        </span>
      </Link>

      <div className="flex gap-x-9">
        {/* Center Section: Navigation */}
        <ul className="flex gap-x-9 text-white font-medium">
          {navItems.map(({ item, link }, index) => (
            <li key={index}>
              <Link
                href={link}
                className={`hover:text-[#477c73] transition-colors duration-200 ${
                  pathname === link ? "text-[#477c73]" : ""
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section: Sign Out */}
        <button className="flex items-center gap-x-2 text-white hover:text-red-400 transition-colors duration-200">
          <PiSignOutBold className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
