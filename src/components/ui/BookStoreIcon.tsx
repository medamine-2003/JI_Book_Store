// src/components/ui/BookStoreIcon.tsx
import React from 'react'

interface BookStoreIconProps {
  size?: number
  className?: string
  variant?: 'default' | 'simple' | 'gradient'
}

export function BookStoreIcon({ size = 32, className = '', variant = 'default' }: BookStoreIconProps) {
  if (variant === 'simple') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M6 4H26C27.1 4 28 4.9 28 6V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V6C4 4.9 4.9 4 6 4Z"
          fill="currentColor"
          opacity="0.1"
        />
        <path
          d="M8 8V24M12 8V24M20 8V24M24 8V24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 8H26M6 16H26M6 24H26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (variant === 'gradient') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef2f2" />
            <stop offset="100%" stopColor="#fecaca" />
          </linearGradient>
        </defs>
        
        {/* Book spine */}
        <rect x="4" y="6" width="4" height="20" rx="1" fill="url(#bookGradient)" />
        <rect x="8" y="4" width="4" height="24" rx="1" fill="url(#bookGradient)" />
        <rect x="12" y="5" width="4" height="22" rx="1" fill="url(#bookGradient)" />
        
        {/* Open book */}
        <path
          d="M20 8C20 8 22 6 26 6C27.1 6 28 6.9 28 8V22C28 23.1 27.1 24 26 24C22 24 20 22 20 22V8Z"
          fill="url(#pageGradient)"
          stroke="#dc2626"
          strokeWidth="1"
        />
        <path
          d="M20 8C20 8 18 6 14 6C12.9 6 12 6.9 12 8V22C12 23.1 12.9 24 14 24C18 24 20 22 20 22V8Z"
          fill="url(#pageGradient)"
          stroke="#dc2626"
          strokeWidth="1"
        />
        
        {/* Book binding */}
        <line x1="20" y1="8" x2="20" y2="22" stroke="#dc2626" strokeWidth="2" />
        
        {/* Page lines */}
        <line x1="15" y1="12" x2="18" y2="12" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="14" x2="18" y2="14" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
        <line x1="22" y1="12" x2="25" y2="12" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
        <line x1="22" y1="14" x2="25" y2="14" stroke="#dc2626" strokeWidth="0.5" opacity="0.6" />
      </svg>
    )
  }

  // Default variant
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Book stack */}
      <rect x="4" y="20" width="16" height="3" rx="1" fill="#dc2626" />
      <rect x="5" y="17" width="14" height="3" rx="1" fill="#ef4444" />
      <rect x="6" y="14" width="12" height="3" rx="1" fill="#f87171" />
      
      {/* Open book */}
      <path
        d="M16 8C16 8 18 6 22 6C23.1 6 24 6.9 24 8V20C24 21.1 23.1 22 22 22C18 22 16 20 16 20V8Z"
        fill="#fef2f2"
        stroke="#dc2626"
        strokeWidth="1.5"
      />
      <path
        d="M16 8C16 8 14 6 10 6C8.9 6 8 6.9 8 8V20C8 21.1 8.9 22 10 22C14 22 16 20 16 20V8Z"
        fill="#fef2f2"
        stroke="#dc2626"
        strokeWidth="1.5"
      />
      
      {/* Book binding */}
      <line x1="16" y1="8" x2="16" y2="20" stroke="#dc2626" strokeWidth="2" />
      
      {/* Page details */}
      <line x1="11" y1="10" x2="14" y2="10" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      <line x1="11" y1="12" x2="14" y2="12" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      <line x1="11" y1="14" x2="13" y2="14" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      <line x1="18" y1="10" x2="21" y2="10" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      <line x1="18" y1="12" x2="21" y2="12" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      <line x1="18" y1="14" x2="20" y2="14" stroke="#dc2626" strokeWidth="0.5" opacity="0.7" />
      
      {/* Bookmark */}
      <rect x="20" y="6" width="1.5" height="8" fill="#dc2626" />
      <path d="M20 14L21.75 12L20 10V14Z" fill="#dc2626" />
    </svg>
  )
}