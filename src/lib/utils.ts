import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0
  }).format(value);
}

export function formatWeight(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: 2
  }).format(value) + ' 吨';
}
