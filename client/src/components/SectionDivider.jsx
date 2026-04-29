import React from "react";

export default function SectionDivider({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(to right, transparent, rgba(82,82,82,0.18), transparent)",
      }}
      className={`h-px w-full ${className}`}
    />
  );
}

