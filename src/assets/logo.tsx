export default function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 400C310.457 400 400 310.457 400 200C400 89.543 310.457 0 200 0C89.543 0 0 89.543 0 200C0 310.457 89.543 400 200 400Z"
        fill="url(#paint0_linear)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M280 120H200C155.817 120 120 155.817 120 200C120 244.183 155.817 280 200 280H280C235.817 280 200 244.183 200 200C200 155.817 235.817 120 280 120Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9D5CFF" />
          <stop offset="1" stopColor="#4B9EFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}