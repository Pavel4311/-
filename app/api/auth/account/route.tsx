import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  console.log("🔵 [API] Получен запрос на /api/auth/account");

  try {
    // Получаем userId из заголовков
    const userId = request.headers.get("x-user-id");
    console.log("🔍 [API] userId из заголовка:", userId);

    if (!userId) {
      console.log("❌ [API] userId не предоставлен");
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    console.log("🔍 [API] Поиск пользователя с ID:", userId);

    // Получаем данные пользователя из БД
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log("❌ [API] Пользователь не найден");
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    console.log("✅ [API] Пользователь найден:", user.email);

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 [API] Ошибка получения данных:", error);
    return NextResponse.json(
      {
        error: "Ошибка сервера",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
