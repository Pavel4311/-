"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "../ui/cart";
export default function CartPage() {
  const { state, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
    useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Корзина пуста</h2>
        <p className="text-gray-500 mb-6">
          Добавьте товары для оформления заказа
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Корзина ({state.itemCount}{" "}
            {state.itemCount === 1 ? "товар" : "товаров"})
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Очистить корзину
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-6 flex gap-6 hover:shadow-md transition"
              >
                {/* Изображение товара */}
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Информация о товаре */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Управление количеством */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        aria-label="Уменьшить количество"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        aria-label="Увеличить количество"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Цена */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.price.toLocaleString("ru-RU")} ₽ за шт.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Кнопка удаления */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-600 transition"
                  aria-label="Удалить товар"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Итоговая информация */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Итого</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({state.itemCount})</span>
                  <span>{state.total.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Всего:</span>
                  <span>{state.total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3">
                Оформить заказ
              </button>

              <Link
                href="/dashboard"
                className="block w-full text-center text-blue-600 py-3 rounded-lg border border-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Продолжить покупки
              </Link>

              {/* Промокод */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Промокод</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
                    Применить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
