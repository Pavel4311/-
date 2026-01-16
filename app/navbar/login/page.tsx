"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.user.id);
        console.log("Успешный вход:", data);
        alert("Вы успешно вошли в систему!");

        router.push("/dashboard/account");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Ошибка входа. Проверьте данные.");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    } finally {
      setEmailOrUsername("");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white">
      {/* Навигация */}
      <nav className="border-b border-white/10 py-4 px-6 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              GiveHope
            </span>
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-pink-300 transition-colors">
              Главная
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-pink-300 transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors"
            >
              О нас
            </Link>
          </div>
        </div>
      </nav>

      {/* Форма входа */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            {/* Заголовок */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                Вход в GiveHope
              </h2>
              <p className="text-gray-300">
                Войдите, чтобы продолжить делать добрые дела
              </p>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email или Username */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email или Username
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Введите email или username"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                />
              </div>

              {/* Пароль */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                />
              </div>

              {/* Забыли пароль */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-white/20 rounded bg-white/5"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Запомнить меня
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Забыли пароль?
                </Link>
              </div>

              {/* Кнопка входа */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Вход...
                  </span>
                ) : (
                  "Войти"
                )}
              </button>
            </form>

            {/* Разделитель */}
            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-sm text-gray-400">или</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Регистрация */}
            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Нет аккаунта?{" "}
                <Link
                  href="/dashboard/login"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>

          {/* Дополнительная информация */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Нажимая «Войти», вы соглашаетесь с нашими{" "}
            <Link href="/terms" className="text-pink-400 hover:text-pink-300">
              Условиями использования
            </Link>{" "}
            и{" "}
            <Link href="/privacy" className="text-pink-400 hover:text-pink-300">
              Политикой конфиденциальности
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
