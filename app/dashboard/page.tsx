"use client";

import productsData from "./product.json";
import { useCallback, useState } from "react";
import { Category, Product, Charity, ProductCatalog } from "./interfaces";
import { Heart, Search, Filter, ShoppingCart } from "lucide-react";
import ProductCard from "./ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./ui/cart";
import { useAnimatedCartAdd } from "@/lib/Animation";

export default function DashboardPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { addWithAnimation, isAnimating } = useAnimatedCartAdd();

  // ✅ ИСПРАВЛЕНО: Используем правильный API из useCart
  const { state, addItem } = useCart();

  const categories: Category[] = productsData.categories;
  const products: Product[] = productsData.products;
  const charities: Charity[] = productsData.charities;

  function getProductsById(productId: string): Product | undefined {
    return productsData.products.find((p) => p.id === productId) as
      | Product
      | undefined;
  }

  function getProductsByCategory(categoryId: string): Product[] {
    return productsData.products.filter(
      (p) => p.category === categoryId
    ) as Product[];
  }

  // ✅ ИСПРАВЛЕНО: Используем addItem из useCart
  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
      addWithAnimation(product, () => {
        console.log(`Товар "${product.name}" добавлен в корзину!`);
      });
    },
    [addWithAnimation, addItem]
  );

  const searchProducts = useCallback((query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return productsData.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    ) as Product[];
  }, []);

  // Фильтрация товаров
  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : selectedCategory === "all"
    ? products
    : getProductsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white">
      {/* Навигация */}
      <nav className="border-b border-white/10 py-4 px-6 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard/login" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              GiveHope
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/login"
              className="hover:text-pink-300 transition-colors"
            >
              Главная
            </Link>
            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors"
            >
              О нас
            </Link>
            <Link
              href="/navbar/login"
              className="hover:text-pink-300 transition-colors"
            >
              Войти
            </Link>

            {/* ✅ ИСПРАВЛЕНО: Используем state.itemCount */}
            <Link
              href="/dashboard/Cart"
              className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Главный контент */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            Каталог товаров
          </h1>
          <p className="text-xl text-gray-200">
            Каждая покупка помогает нуждающимся ❤️
          </p>
        </div>

        {/* Поиск */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
          </div>
        </div>

        {/* Категории */}
        <div className="mb-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Все товары
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {filteredProducts.length}
            </div>
            <div className="text-sm text-gray-300">Товаров найдено</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {charities.length}
            </div>
            <div className="text-sm text-gray-300">
              Благотворительных фондов
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
            <div className="text-sm text-gray-300">Прибыль на добрые дела</div>
          </div>
          {/* ✅ ИСПРАВЛЕНО: Используем state.itemCount */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {state.itemCount}
            </div>
            <div className="text-sm text-gray-300">Товаров в корзине</div>
          </div>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Товары не найдены</h3>
            <p className="text-gray-400">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

        {/* Благотворительные фонды */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Кому мы помогаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities.map((charity) => (
              <div
                key={charity.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-pink-500/50 transition-all"
              >
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">{charity.name}</h3>
                <p className="text-sm text-gray-300 mb-4">
                  {charity.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Собрано средств:</span>
                    <span className="font-bold text-pink-400">
                      {charity.totalRaised.toLocaleString()} ₽
                    </span>
                  </div>
                  {charity.childrenHelped && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Помогли детям:</span>
                      <span className="font-bold text-pink-400">
                        {charity.childrenHelped}
                      </span>
                    </div>
                  )}
                  {charity.peopleHelped && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Помогли людям:</span>
                      <span className="font-bold text-pink-400">
                        {charity.peopleHelped}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-300 backdrop-blur-sm bg-black/20 mt-20">
        <p className="mb-2">
          <Heart className="inline w-5 h-5 text-pink-400 fill-current mx-1" />
          GiveHope © 2024 • Делаем мир добрее
        </p>
      </footer>
    </div>
  );
}
