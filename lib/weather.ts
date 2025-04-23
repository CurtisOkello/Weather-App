import type { WeatherData } from "@/types/weather"

export async function getWeatherData(location: string): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_API_URL
  const weatherApiKey = process.env.WEATHER_API_KEY

  if (!apiKey || !weatherApiKey) {
    throw new Error("API URL or Weather API key not configured")
  }

  try {
    const response = await fetch(
      `${apiKey}?key=${weatherApiKey}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`,
    )

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`)
    }

    const data = await response.json()
    return data as WeatherData
  } catch (error) {
    console.error("Failed to fetch weather data:", error)
    throw new Error("Failed to fetch weather data")
  }
}
