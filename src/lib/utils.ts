import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds} секунду${diffInSeconds === 1 ? "" : "s"} назад`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} минуту${diffInMinutes === 1 ? "" : "s"} назад`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} час${diffInHours === 1 ? "" : "s"} назад`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} день${diffInDays === 1 ? "" : "s"} назад`;
  }
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} неделю${diffInWeeks === 1 ? "" : "s"} назад`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} месяца${diffInMonths === 1 ? "" : "s"} назад`;
}