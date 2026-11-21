"использовать клиент"
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/реагировать-метка"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const labelVariants = cva(
  "text-sm шрифт-средний ведущий-нет одноранговый отключен: курсор-не разрешен одноранговый отключен: непрозрачность-70"
)
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
export { Label }