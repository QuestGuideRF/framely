import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs шрифт-полужирный шрифт переходных цветов фокус: контур-нет фокус: кольцо-2 фокус: кольцо-кольцо фокус: кольцо-смещение-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground тень при наведении: bg-primary/80",
        secondary:
          "граница-прозрачна bg-вторичный текст-вторичный-передний план hover:bg-вторичный/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foregroundshadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
export { Badge, badgeVariants }