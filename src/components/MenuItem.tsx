// ./src/components/MenuItem.tsx
//
// Static, generic bux menue item component with NextJS link.

// NextJS defaults to maximizing server-side rendering (SSR) for performance for static components.

// NextJS essential imports.
import Link from "next/link";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MenuItemProps {
  href      : string;
  text      : string;
  className?: string;
}

// -----------------------------------------------------------------------------
export function MenuItem({
  href,
  text,
  className = "",
}: MenuItemProps): JSX.Element {
  return (
    <li className={`bux-menu__item ${className}`}>
      <Link href={href} className="bux-menu__link cursor-pointer">
        {text}
      </Link>
    </li>
  );
}
