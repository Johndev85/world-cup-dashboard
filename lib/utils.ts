import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviateTeamName(name: string): string {
  const parts = name.split(" ")
  if (parts.length <= 1) return name
  return parts[0][0] + ". " + parts.slice(1).join(" ")
}
