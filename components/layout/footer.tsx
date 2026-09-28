import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-500"
          >
            <path
              d="M16 2L2 12V28L16 30L30 28V12L16 2Z"
              fill="currentColor"
            />
            <path d="M16 8L8 14V24L16 26L24 24V14L16 8Z" fill="white" />
          </svg>
          <div className="flex flex-col">
            <span className="font-sans text-[14px] font-bold leading-none tracking-tight text-neutral-900">
              Serene
            </span>
            <span className="font-sans text-[14px] font-bold leading-none tracking-tight text-neutral-900">
              Lavoisier
            </span>
          </div>
        </div>

        <p className="text-small text-neutral-500 text-center sm:text-left">
          © 2026 Serene Lavoisier. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-small font-medium text-neutral-500 hover:text-primary-500 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-small font-medium text-neutral-500 hover:text-primary-500 transition-colors">
            Terms and Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
