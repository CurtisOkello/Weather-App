// import type { WeatherData } from "@/types/weather"

// export async function getWeatherData(location: string): Promise<WeatherData> {
//   const ApiKey = process.env.WEATHER_API_KEY
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL
  

//   if (!ApiKey || !apiUrl) {
//     throw new Error("API URL or Weather API key not configured")
//   }

//   try {
//     const response = await fetch(
//       `${apiUrl}?key=${ApiKey}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`,
//     )

//     if (!response.ok) {
//       throw new Error(`Error fetching weather data: ${response.statusText}`)
//     }

//     const data = await response.json()
//     return data as WeatherData
//   } catch (error) {
//     console.error("Failed to fetch weather data:", error)
//     throw new Error("Failed to fetch weather data")
//   }
// }



import type { WeatherData } from "@/types/weather";

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    return data as WeatherData;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}