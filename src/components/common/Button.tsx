import clsx from "clsx";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

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
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;

