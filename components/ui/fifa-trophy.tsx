import Image from "next/image"

export function FifaTrophy({ className }: { className?: string }) {
  return (
    <Image
      src="/copa-mundial-icon.png"
      alt="FIFA World Cup Trophy"
      width={40}
      height={53}
      className={className}
      priority
    />
  )
}
