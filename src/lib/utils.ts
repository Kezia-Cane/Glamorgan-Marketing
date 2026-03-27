import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const USER_NAMES: Record<string, string> = {
  'knermal00@gmail.com': 'Krizelle',
  'nick@glamorgan-hvac.com': 'Nick',
  'keziacane123@gmail.com': 'Dev',
  'mel@glamorgan-hvac.com': 'Mel',
  'keziacane.dev@gmail.com': 'KC',
}
