import { useState } from "react";
import { useCart } from "@/app/dashboard/ui/cart";
import { Product } from "@/app/dashboard/interfaces";

// Callback для анимированного добавления товара в корзину
export const useAnimatedCartAdd = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const addWithAnimation = (
    product: Product,
    onAnimationComplete?: () => void
  ) => {
    // Запускаем анимацию
    setIsAnimating(true);

    // Добавляем товар

    // Показываем уведомление
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-bounce";
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">🛒</span>
        <div>
          <p class="font-semibold">${product.name}</p>
          <p class="text-sm opacity-90">Добавлено в корзину</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      notification.style.transition = "opacity 0.5s";
      notification.style.opacity = "0";

      setTimeout(() => {
        document.body.removeChild(notification);
        setIsAnimating(false);

        // Вызываем callback после завершения анимации
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 500);
    }, 3000);
  };

  return { addWithAnimation, isAnimating };
};
