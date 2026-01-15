"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Package, Users, TrendingUp } from "lucide-react";

export default function CharityHomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    phone: string;
    username: string;
    referal?: string;
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

      alert(`✅ Регистрация успешна! Добро пожаловать, ${data.user.username}!`);
      localStorage.setItem("userId", data.user.id);
      router.push("/dashboard");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white">
      {/* Навигация */}
      <nav className="border-b border-white/10 py-4 px-6 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              GiveHope
            </span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors"
            >
              О проекте
            </Link>
            <Link
              href="/catalog"
              className="hover:text-pink-300 transition-colors"
            >
              Каталог товаров
            </Link>
            <Link
              href="/projects"
              className="hover:text-pink-300 transition-colors"
            >
              Наши проекты
            </Link>
            <Link
              href="/navbar/login"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              Войти
            </Link>
          </div>
        </div>
      </nav>

      {/* Главный контент */}
      <main className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Покупай с пользой
              </span>
              <br />
              <span className="text-white">Помогай нуждающимся</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
              Приобретая товары на нашей платформе, вы помогаете детским домам,
              приютам для животных и благотворительным организациям. 100%
              прибыли идут на добрые дела! ❤️
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Форма регистрации */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                <h2 className="text-3xl font-bold mb-6">
                  Присоединяйтесь к нам!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Email адрес *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Имя пользователя *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                      placeholder="username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Пароль *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                      placeholder="Создайте надежный пароль"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Реферальный код (опционально)
                    </label>
                    <input
                      type="text"
                      name="referal"
                      value={formData.referal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                      placeholder="Пригласил друг? Введите код"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 mt-1 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-200">
                      Я принимаю условия использования и согласен с тем, что
                      средства будут направлены на благотворительные цели
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-300">
                    Уже есть аккаунт?{" "}
                    <Link
                      href="/navbar/login"
                      className="text-pink-400 hover:text-pink-300 transition-colors font-semibold"
                    >
                      Войти
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка с информацией */}
            <div className="space-y-8">
              {/* Преимущества */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-pink-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 mb-4">
                      <feature.icon className="w-6 h-6 text-pink-300" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Статистика */}
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                  Наши достижения
                </h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300">{stat.label}</span>
                      <span className="font-bold text-lg text-pink-400">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Как это работает */}
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Как это работает?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <span className="text-gray-200">
                      Регистрируйтесь на платформе
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <span className="text-gray-200">
                      Выбирайте товары в каталоге
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <span className="text-gray-200">
                      Деньги автоматически отправляются в фонды
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <span className="text-gray-200">
                      Отслеживайте, куда пошли средства
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-300 backdrop-blur-sm bg-black/20">
        <p className="mb-2">
          <Heart className="inline w-5 h-5 text-pink-400 fill-current mx-1" />
          GiveHope © 2024 • Делаем мир добрее
        </p>
        <p className="text-sm">
          Все средства направляются на благотворительность.
          <Link
            href="/transparency"
            className="text-pink-400 hover:text-pink-300 ml-1"
          >
            Отчетность
          </Link>
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Heart,
    title: "100% на добрые дела",
    description: "Вся прибыль идет в благотворительные фонды",
  },
  {
    icon: Package,
    title: "Широкий ассортимент",
    description: "Одежда, игрушки, книги, сувениры и многое другое",
  },
  {
    icon: Users,
    title: "Прозрачность",
    description: "Видите куда идут ваши деньги в реальном времени",
  },
  {
    icon: TrendingUp,
    title: "Реальная помощь",
    description: "Поддержка детских домов, приютов и больниц",
  },
];

const stats = [
  { label: "Собрано средств", value: "12.5 млн ₽" },
  { label: "Помогли организациям", value: "45+" },
  { label: "Довольных покупателей", value: "8,200" },
  { label: "Товаров продано", value: "25,000" },
];
