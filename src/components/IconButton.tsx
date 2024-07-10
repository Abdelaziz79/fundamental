import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  variant?:
    | "outline"
    | "ghost"
    | "default"
    | "secondary"
    | "link"
    | "destructive"
    | null
    | undefined;
};

export default function IconLinkButton({
  href,
  children,
  className,
  size,
  variant,
}: Props) {
  return (
    <Link href={href}>
      <Button
        size={size || "sm"}
        variant={variant || "outline"}
        className={className || ""}
      >
        {children}
      </Button>
    </Link>
  );
}
