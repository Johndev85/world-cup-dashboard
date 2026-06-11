import { NextResponse } from "next/server"

const FALLBACK_URL = "https://worldcup26.ir/get/games"

export async function GET() {
  try {
    const res = await fetch(FALLBACK_URL, { next: { revalidate: 300 } })
    if (!res.ok) {
      return NextResponse.json({ games: [] }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ games: [] }, { status: 500 })
  }
}
