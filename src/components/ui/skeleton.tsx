import { cn } from "@/lib/utils"
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("анимация-импульс округлый-MD BG-первичный/10", className)}
      {...props}
    />
  )
}
export { Skeleton }