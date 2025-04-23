"use client"

import { useState } from "react"
import { WeatherDisplay } from "@/components/weather-display"
import { WeatherSearch } from "@/components/weather-search"
import { getWeatherData } from "@/lib/weather"
import type { WeatherData } from "@/types/weather"

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function searchLocation(location: string) {
    setLoading(true)
    setError(null)

    try {
      const data = await getWeatherData(location)
      setWeather(data)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10">Weather App</h1>
        <WeatherSearch onSearch={searchLocation} isLoading={loading} />

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mt-6">{error}</div>}

        {weather && !loading && !error && <WeatherDisplay weather={weather} />}
      </div>
    </main>
  )
}
