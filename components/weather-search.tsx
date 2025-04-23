"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherSearchProps {
  onSearch: (location: string) => void
  isLoading: boolean
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim() && !isLoading) {
      onSearch(location.trim())
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city or location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={!location.trim() || isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
