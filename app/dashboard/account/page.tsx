"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, User, Mail, Phone, LogOut, ShoppingBag } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  username: string;
  phone?: string | null;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          router.push("/navbar/login");
          return;
        }

        const response = await fetch("/api/auth/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("User data fetched:", data);
          setUser(data.user);
        } else if (response.status === 401 || response.status === 404) {
          localStorage.removeItem("userId");
          router.push("/navbar/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(
          "Произошла ошибка при получении данных пользователя. Пожалуйста, попробуйте еще раз."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/navbar/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </nav>

      {/* Контент страницы */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Мой аккаунт
            </h1>
            <p className="text-gray-200 mt-2">
              Добро пожаловать, {user.username}!
            </p>
          </div>

          {/* Информация о пользователе */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/20">
              <User className="w-6 h-6 text-pink-400" />
              <div>
                <p className="text-sm text-gray-300">Имя пользователя</p>
                <p className="text-lg font-semibold">{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/20">
              <Mail className="w-6 h-6 text-pink-400" />
              <div>
                <p className="text-sm text-gray-300">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/20">
                <Phone className="w-6 h-6 text-pink-400" />
                <div>
                  <p className="text-sm text-gray-300">Телефон</p>
                  <p className="text-lg font-semibold">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/20">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-pink-400 text-xl">🆔</span>
              </div>
              <div>
                <p className="text-sm text-gray-300">ID</p>
                <p className="text-sm font-mono text-gray-300">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all text-center"
            >
              <ShoppingBag className="w-5 h-5" />
              Перейти к покупкам
            </Link>
            <Link
              href="/dashboard/Cart"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-center"
            >
              <Heart className="w-5 h-5" />
              Моя корзина
            </Link>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-8 p-6 bg-pink-500/10 rounded-lg border border-pink-500/20">
            <h3 className="font-semibold text-pink-300 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Ваш вклад в благотворительность
            </h3>
            <p className="text-gray-200 text-sm">
              Спасибо, что делаете мир добрее! Каждая ваша покупка помогает
              нуждающимся.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
