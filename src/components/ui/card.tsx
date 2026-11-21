import * as React from "react"
import { cn } from "@/lib/utils"
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "граница с закругленными краями bg-card, тень на переднем плане, текстовая карта",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("шрифт-полужирный, ведущий-нет, отслеживание-плотно", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("текст-см текст-приглушенный-передний план", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("р-6 пт-0", className)} {...props} />
))
CardContent.displayName = "CardContent"
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("гибкие элементы-центр p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }