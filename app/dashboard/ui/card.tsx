"use client";
import { Product } from "@/app/dashboard/interfaces";
import { button } from "framer-motion/client";
import { use, useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface CardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function Card({ product, onAddToCart }: CardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div
      className="group relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-pink-500 text-pink-500" : "text-white"
          }`}
        ></Heart>
      </button>

      <div className="relative h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {product.category === "clothing" && "👕"}
          {product.category === "toys" && "🧸"}
          {product.category === "books" && "📚"}
          {product.category === "accessories" && "🎒"}
          {product.category === "home" && "🏠"}
          {product.category === "stationery" && "✏️"}
        </div>

        {/* Overlay при наведении */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            Добавить в корзину
          </button>
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="p-6">
        {/* Название */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
          {product.name}
        </h3>

        {/* Описание */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Благотворительность */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
          <Heart className="w-4 h-4 text-pink-400 fill-current" />
          <span className="text-xs text-pink-300">
            {product.charityPercent}% → {product.charity}
          </span>
        </div>

        {/* Рейтинг */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            {product.rating} ({product.reviews} отзывов)
          </span>
        </div>

        {/* Цена */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {product.price.toLocaleString()} ₽
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()} ₽
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">
              В наличии: {product.stock} шт.
            </span>
          </div>
        </div>

        {/* Теги */}
        <div className="flex flex-wrap gap-2 mt-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
