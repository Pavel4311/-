"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "date-fns";
import { label } from "framer-motion/client";
import { TruckElectric } from "lucide-react";

export default function HomePage() {
  const roter = useRouter();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    phone: string;
    username: string;
    referal: string;
  }>({
    email: "",
    password: "",
    phone: "",
    username: "",
    referal: "",
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Проверяем заполненность полей перед отправкой
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.phone === "" ||
      formData.username === ""
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      setIsLoading(false);
      return;
    }

    if (!isChecked) {
      alert("Пожалуйста, примите политику конфиденциальности");
      setIsLoading(false);
      return;
    }

    try {
      console.log("📤 [CLIENT] Отправка данных на сервер:", formData);

      // ВОТ ЭТО ОТСУТСТВОВАЛО - fetch запрос на API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📥 [CLIENT] Получен ответ, статус:", response.status);

      const data = await response.json();
      console.log("📥 [CLIENT] Данные ответа:", data);

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при регистрации");
      }

      // Успешная регистрация
      alert(`✅ Регистрация успешна! Добро пожаловать, ${data.user.username}!`);

      // Сохраняем данные пользователя в localStorage (опционально)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Переходим на дашборд
      roter.push("/dashboard");
    } catch (error) {
      console.error("💥 [CLIENT] Ошибка при регистрации:", error);
      alert(
        `❌ Ошибка: ${
          error instanceof Error
            ? error.message
            : "Произошла неизвестная ошибка"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleCheckInput = () => {
    const { email, password, phone, username, referal } = formData;
    if (email !== "" && password !== "" && phone !== "" && username !== "") {
      alert("Все поля заполнены");
    } else {
      alert("Пожалуйста, заполните все обязательные поля");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <TruckElectric className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              EcoTrack
            </span>
          </div>
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
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Войти
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Мониторинг и оптимизация
              </span>
              <br />
              <span className="text-white">экологических показателей</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Современная платформа для отслеживания углеродного следа,
              управления отходами и достижения целей устойчивого развития
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-6">
                  Начните работу с EcoTrack
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email адрес *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Имя пользователя *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Пароль *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="Создайте надежный пароль"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Реферальный код (опционально)
                    </label>
                    <input
                      type="text"
                      name="referal"
                      value={formData.referal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="Введите код если есть"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 mt-1 rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-300">
                      Я принимаю условия использования и подтверждаю, что
                      ознакомился с политикой конфиденциальности
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Обработка...
                        </span>
                      ) : (
                        "Создать аккаунт"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckInput}
                      className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                      Проверить
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400">
                    Уже есть аккаунт?{" "}
                    <Link
                      href="/login"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Войти
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/20 border border-gray-700/30 hover:border-green-500/30 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-4">
                      <feature.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6">Наши достижения</h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="font-bold text-lg text-green-400">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6">Быстрый старт</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-gray-300">
                      Зарегистрируйтесь в системе
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-gray-300">
                      Настройте источники данных
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-gray-300">
                      Получите первые отчеты и рекомендации
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-400">
        <p>EcoTrack © 2024 • Создано для устойчивого будущего</p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: TruckElectric,
    title: "Умный мониторинг",
    description: "Автоматический сбор данных о выбросах",
  },
  {
    icon: () => (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Аналитика в реальном времени",
    description: "Дашборды и отчеты по экологическим показателям",
  },
  {
    icon: () => (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Оптимизация процессов",
    description: "Рекомендации по снижению углеродного следа",
  },
  {
    icon: () => (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Безопасность данных",
    description: "Защищенное хранение экологической информации",
  },
];

const stats = [
  { label: "Компаний используют", value: "1,200+" },
  { label: "Снижение выбросов CO₂", value: "45%" },
  { label: "Автоматизированных отчетов", value: "15,000" },
  { label: "Подключенных датчиков", value: "8,500" },
];
