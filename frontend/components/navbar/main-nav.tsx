import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        首页
      </Link>

      <Link
        href="/prompts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        商品列表
      </Link>
      <Link
        href="/wishlist"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        心愿单
      </Link>
      <Link
        href="/order/all"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        订单列表
      </Link>
    </nav>
  )
}
