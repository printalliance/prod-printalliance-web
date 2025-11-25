import clsx from "clsx";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    AnchorHTMLAttributes<HTMLAnchorElement>,
    PropsWithChildren {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  href?: string;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-red text-white hover:bg-[#c92f3a] focus-visible:ring-red shadow-lg",
  secondary:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy",
  ghost:
    "text-navy hover:text-red focus-visible:ring-navy focus-visible:ring-offset-0",
};

const Button = ({
  children,
  variant = "primary",
  fullWidth,
  className,
  href,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    baseClasses,
    variants[variant],
    fullWidth && "w-full",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;

