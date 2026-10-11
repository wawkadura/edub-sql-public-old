import { useId } from "react";

interface LibreDBLogoProps {
  className?: string;
}

/**
 * The product mark, kept in step with `public/logo.svg` and generated from it.
 *
 * Every gradient id is suffixed with `useId()` rather than written as a constant: this
 * component can be mounted more than once on a page, and SVG ids share one
 * document-wide namespace, so two instances with fixed ids would have the second
 * silently repaint the first. `tests/unit/svg-asset-id-namespacing.test.ts` holds the
 * same rule for the static assets.
 */
export default function LibreDBLogo({ className }: LibreDBLogoProps) {
  const svgId = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${svgId}`;

  return (
    <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient
          id={id("libredb-brand-gradient")}
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${id("libredb-brand-gradient")})`} />
      <path
        fill="#ffffff"
        d="M256 96c-79.5 0-144 23.3-144 52v36c0 28.7 64.5 52 144 52s144-23.3 144-52v-36c0-28.7-64.5-52-144-52Z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.85"
        d="M112 232v48c0 28.7 64.5 52 144 52s144-23.3 144-52v-48c-26.200 22.7-80.6 36-144 36s-117.8-13.3-144-36Z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.7"
        d="M112 328v36c0 28.7 64.5 52 144 52s144-23.3 144-52v-36c-26.200 22.7-80.6 36-144 36s-117.8-13.3-144-36Z"
      />
    </svg>
  );
}
