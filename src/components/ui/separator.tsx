"использовать клиент"
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/реагировать-разделитель"
import { cn } from "@/lib/utils"
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "сжатие-0 bg-границы",
        orientation === "horizontal" ? "h-[1px] w-полный" : "h-полный w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName
export { Separator }