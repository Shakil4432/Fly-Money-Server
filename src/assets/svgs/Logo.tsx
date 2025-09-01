export default function Logo() {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="w-[200px]  lg:w-full h-auto max-w-[280px]" // Tailwind utility for responsiveness
    >
      {/* Leather Tag Icon */}
      <g transform="translate(10, 10)">
        <path
          d="M30 10 H80 A10 10 0 0 1 90 20 V60 A10 10 0 0 1 80 70 H30 L10 40 Z"
          fill="#7c3f00"
          stroke="#fef9c3"
          strokeWidth="2"
        />
        <circle cx="35" cy="40" r="5" fill="#fef9c3" />
      </g>

      {/* Brand Name */}
      <text
        x="120"
        y="70"
        fontSize="50"
        fontWeight="bold"
        fontFamily="Georgia, serif"
        fill="#7c3f00"
      >
        Fly Money
      </text>
    </svg>
  );
}
