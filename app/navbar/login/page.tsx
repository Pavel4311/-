"use client";

import { fi } from "date-fns/locale";
import { useState } from "react";
import { TruckElectric } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
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
        console.log("Успешный вход:", data);
        alert("Вы успешно вошли в систему!");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    } finally {
      setEmailOrUsername("");
      setPassword("");
      setisLoading(false);
    }
  };

  const handleEmailOrUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailOrUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Навигация */}
      <nav className="border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <TruckElectric className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              EcoTrack
            </span>
          </Link>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="hover:text-cyan-300 transition-colors"
            >
              О нас
            </Link>
            <Link
              href="/features"
              className="hover:text-cyan-300 transition-colors"
            >
              Возможности
            </Link>
            <Link
              href="/pricing"
              className="hover:text-cyan-300 transition-colors"
            >
              Тарифы
            </Link>
          </div>
        </div>
      </nav>

      {/* Форма входа */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Вход в систему
              </h2>
              <p className="text-gray-400">
                Войдите, чтобы продолжить работу с EcoTrack
              </p>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email или Username */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email или Username
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  value={emailOrUsername}
                  onChange={handleEmailOrUsernameChange}
                  placeholder="Введите email или username"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Пароль */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Введите пароль"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Забыли пароль */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 rounded bg-gray-900"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Запомнить меня
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Забыли пароль?
                </Link>
              </div>

              {/* Кнопка входа */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="px-4 text-sm text-gray-500">или</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Регистрация */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Нет аккаунта?{" "}
                <Link
                  href="/dashboard/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>

          {/* Дополнительная информация */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Нажимая «Войти», вы соглашаетесь с нашими{" "}
            <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
              Условиями использования
            </Link>{" "}
            и{" "}
            <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
              Политикой конфиденциальности
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
