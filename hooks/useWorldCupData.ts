"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchWorldCupData, type WorldCupData } from "@/lib/api/wc2026-api"

export function useWorldCupData() {
  const [data, setData] = useState<WorldCupData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchWorldCupData()
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error cargando datos")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error, refresh: load }
}
