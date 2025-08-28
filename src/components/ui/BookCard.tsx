// src/components/ui/BookCard.tsx
import Image from "next/image";
import { Button } from "./Button";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    price: number;
    rentalPrice: number;
  };
  onBuy: (id: string) => void;
  onRent: (id: string) => void;
}

export function BookCard({ book, onBuy, onRent }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{book.author}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-red-600">${book.price}</span>
          <span className="text-sm text-gray-500">
            ${book.rentalPrice}/week
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onBuy(book.id)} className="flex-1">
            Buy
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRent(book.id)}
            className="flex-1"
          >
            Rent
          </Button>
        </div>
      </div>
    </div>
  );
}
