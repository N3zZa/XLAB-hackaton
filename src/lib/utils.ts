import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* shadcdn utils */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
