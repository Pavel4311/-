"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TruckElectric, User, Mail, Phone, LogOut } from "lucide-react";

interface userData {
  id: string;
  email: string;
  username: string;
  phone?: string | null;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<userData | null>(null);
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

          if (response.status === 401 || response.status === 404) {
            localStorage.removeItem("userId");
            router.push("/navbar/login");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(
          "Произошла ошибка при получении данных пользователя. Пожалуйста, попробуйте еще раз."
        );
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/navbar/login");
  };

  if (!user) {
    return null; // Или можно показать сообщение об ошибке
  }
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </nav>

      {/* Контент страницы */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Мой аккаунт
            </h1>
            <p className="text-gray-400 mt-2">
              Добро пожаловать, {user.username}!
            </p>
          </div>

          {/* Информация о пользователе */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <User className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-sm text-gray-400">Имя пользователя</p>
                <p className="text-lg font-semibold">{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <Mail className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <Phone className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Телефон</p>
                  <p className="text-lg font-semibold">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-cyan-400 text-xl">🆔</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">ID</p>
                <p className="text-sm font-mono text-gray-300">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all text-center"
            >
              Перейти в Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
