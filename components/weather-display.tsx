import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { WeatherData } from "@/types/weather"
import { Thermometer, Wind, Droplets, Sun } from "lucide-react"

interface WeatherDisplayProps {
  weather: WeatherData
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {weather.location.name}, {weather.location.country}
          </CardTitle>
          <CardDescription>{new Date(weather.location.localtime).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <img
                src={`https:${weather.current.condition.icon}`}
                alt={weather.current.condition.text}
                width={80}
                height={80}
              />
              <p className="text-4xl font-bold mt-2">{weather.current.temp_c}°C</p>
              <p className="text-muted-foreground">{weather.current.condition.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Feels Like</p>
                  <p className="font-medium">{weather.current.feelslike_c}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-medium">{weather.current.wind_kph} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-medium">{weather.current.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">UV Index</p>
                  <p className="font-medium">{weather.current.uv}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forecast</CardTitle>
          <CardDescription>Weather forecast for the next 3 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {weather.forecast.forecastday.map((day, index) => (
              <div key={day.date}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={40} height={40} />
                    <div>
                      <p className="font-medium">
                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
                      </p>
                      <p className="text-sm text-muted-foreground">{day.day.condition.text}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-medium">{day.day.maxtemp_c}°</p>
                    <p className="text-muted-foreground">{day.day.mintemp_c}°</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
