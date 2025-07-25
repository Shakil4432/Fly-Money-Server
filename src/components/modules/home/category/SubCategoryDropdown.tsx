// components/SubCategoryDropdown.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface SubCategoryDropdownProps {
  position: { top: number; left: number };
  items: string[];
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
}

const SubCategoryDropdown = ({
  position,
  items,
  onClose,
  primaryColor,
  secondaryColor,
}: SubCategoryDropdownProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="absolute z-[9999] w-48 rounded-lg"
      style={{
        top: position.top,
        left: position.left,
        border: `1px solid ${primaryColor}`,
        backgroundColor: "#090807",
        color: primaryColor,
        boxShadow: `0 4px 10px ${primaryColor}50`,
        position: "fixed",
      }}
    >
      <ul className="divide-y" style={{ borderColor: `${primaryColor}30` }}>
        {items.map((sub) => (
          <li
            key={sub}
            className="px-5 py-3 cursor-pointer text-sm font-semibold transition-colors duration-200"
            style={{ borderBottom: `1px solid ${primaryColor}30` }}
            tabIndex={0}
            role="menuitem"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = primaryColor;
            }}
          >
            {sub}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
};

export default SubCategoryDropdown;
