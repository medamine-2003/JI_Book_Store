// src/app/trends/TrendsClient.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BookCard } from '@/components/ui/BookCard'

interface TrendingBook {
  id: string
  title: string
  author: string
  imageUrl: string
  price: number
  rentalPrice: number
  rentals: number
  purchases: number
  rank: number
}

// Mock trending data
const mockTrendingBooks: TrendingBook[] = [
  {
    id: '1',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    imageUrl: 'https://covers.openlibrary.org/b/id/12583254-L.jpg',
    price: 16.99,
    rentalPrice: 4.49,
    rentals: 245,
    purchases: 89,
    rank: 1,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    imageUrl: 'https://covers.openlibrary.org/b/id/8509858-L.jpg',
    price: 18.99,
    rentalPrice: 4.99,
    rentals: 198,
    purchases: 156,
    rank: 2,
  },
  {
    id: '3',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    imageUrl: 'https://covers.openlibrary.org/b/id/10523110-L.jpg',
    price: 15.99,
    rentalPrice: 3.99,
    rentals: 187,
    purchases: 72,
    rank: 3,
  },
]

export default function TrendsClient() {
  const [trendingBooks, setTrendingBooks] = useState<TrendingBook[]>([])
  const [viewType, setViewType] = useState<'rentals' | 'purchases' | 'combined'>('combined')
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('month')
  const [loading, setLoading] = useState(false)

  // Fetch trends (mock fallback if API fails)
  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ viewType, timeFrame })
        const response = await fetch(`/api/trends?${params}`)

        if (response.ok) {
          const data = await response.json()
          setTrendingBooks(data)
        } else {
          console.log('Trends API failed, using mock data')
          setTrendingBooks(mockTrendingBooks)
        }
      } catch (error) {
        console.error('Error fetching trends:', error)
        setTrendingBooks(mockTrendingBooks)
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
  }, [viewType, timeFrame])

  const sortedBooks = trendingBooks // Assume API returns sorted

  const handleBuy = async (bookId: string) => {
    alert('Please sign in to purchase books')
  }

  const handleRent = async (bookId: string) => {
    alert('Please sign in to rent books')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Trending Books</h1>
        <p className="text-gray-600 mb-6">
          Discover what everyone is reading right now
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* View Type */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">View:</label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="combined">Most Popular</option>
              <option value="rentals">Most Rented</option>
              <option value="purchases">Most Purchased</option>
            </select>
          </div>

          {/* Time Frame */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Period:</label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Books */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Trending</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sortedBooks.slice(0, 3).map((book, index) => (
            <div key={book.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>

                  {/* Stats */}
                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Rentals:</span>
                      <span className="font-medium">{book.rentals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Purchases:</span>
                      <span className="font-medium">{book.purchases}</span>
                    </div>
                  </div>

                  {/* Prices */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-red-600">
                      ${book.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      ${book.rentalPrice}/week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Trending List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Trending Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((book, idx) => (
            <div key={book.id} className="relative">
              {/* Position Badge */}
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                #{idx + 1}
              </div>
              <BookCard book={book} onBuy={handleBuy} onRent={handleRent} />
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Rentals */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Rentals</h3>
          <p className="text-3xl font-bold text-red-600">
            {trendingBooks.reduce((sum, book) => sum + book.rentals, 0)}
          </p>
          <p className="text-sm text-gray-600">This {timeFrame}</p>
        </div>

        {/* Total Purchases */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Purchases</h3>
          <p className="text-3xl font-bold text-red-600">
            {trendingBooks.reduce((sum, book) => sum + book.purchases, 0)}
          </p>
          <p className="text-sm text-gray-600">This {timeFrame}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-red-600">
            $
            {trendingBooks
              .reduce(
                (sum, book) =>
                  sum + book.purchases * book.price + book.rentals * book.rentalPrice,
                0
              )
              .toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">This {timeFrame}</p>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading trending books...</p>
        </div>
      )}
    </div>
  )
}
