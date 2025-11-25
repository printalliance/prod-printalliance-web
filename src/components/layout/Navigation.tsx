import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const Navigation = ({ onNavigate }: { onNavigate?: () => void }) => {
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") {
      return router.asPath === "/";
    }
    return router.asPath.startsWith(href);
  };

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            "text-base font-medium transition hover:text-red",
            isActive(item.href) ? "text-red" : "text-white",
          )}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Navigation;

