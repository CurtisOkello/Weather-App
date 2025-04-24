// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  
  if (!location) {
    return NextResponse.json(
      { error: 'Location parameter is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = process.env.WEATHER_API_URL || 'https://api.weatherapi.com/v1/forecast.json';

  if (!apiKey) {
    console.error('Weather API key not configured');
    return NextResponse.json(
      { error: 'Weather service configuration error' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}