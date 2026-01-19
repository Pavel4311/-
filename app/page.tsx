"use client";

import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import {
  ArrowRight,
  Heart,
  Shield,
  Users,
  Gift,
  TrendingUp,
  Globe,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const stats = useMemo(
    () => [
      { icon: Heart, value: "2.5M₽", label: "Собрано для благотворительности" },
      { icon: Users, value: "10,000+", label: "Активных благотворителей" },
      { icon: Gift, value: "5,000+", label: "Товаров продано" },
    ],
    [] // ← Пустой массив = вычисляется только один раз
  );

  const StatCard = memo(
    ({ stat }: { stat: { icon: any; value: string; label: string } }) => {
      const Icon = stat.icon;
      return (
        <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
          <Icon className="w-12 h-12 text-pink-400 mb-4" />
          <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-gray-300">{stat.label}</div>
        </div>
      );
    }
  );
  StatCard.displayName = "StatCard";

  const FeatureCard = memo(
    ({
      feature,
      index,
    }: {
      feature: { icon: any; title: string; description: string };
      index: number;
    }) => {
      const Icon = feature.icon;
      return (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 mb-6">
            <feature.icon className="w-7 h-7 text-pink-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </motion.div>
      );
    }
  );
  FeatureCard.displayName = "FeatureCard";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 mb-6">
              <Heart className="w-4 h-4 text-pink-400 mr-2 fill-current" />
              <span className="text-sm font-medium text-pink-300">
                ДЕЛАЕМ МИР ДОБРЕЕ ВМЕСТЕ
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                GiveHope
              </span>
              <br />
              <span className="text-white">Благотворительная платформа</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
              Покупайте качественные товары и помогайте нуждающимся. 100%
              прибыли направляется на благотворительность.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/login"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Перейти к регистрации
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <Users className="mr-2 w-5 h-5" />О нас
              </Link>
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Почему выбирают <span className="text-pink-400">GiveHope</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Категории товаров */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Категории товаров
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl p-12 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5" />

            <h2 className="text-4xl font-bold mb-6 relative z-10">
              Готовы делать добрые дела?
            </h2>

            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto relative z-10">
              Присоединяйтесь к 10,000+ людям, которые уже помогают через
              GiveHope
            </p>

            <Link
              href="/dashboard/login"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 relative z-10"
            >
              <UserPlus className="mr-3 w-5 h-5" />
              Создать аккаунт
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-300 backdrop-blur-sm bg-black/20 mt-20">
        <p className="mb-2">
          <Heart className="inline w-5 h-5 text-pink-400 fill-current mx-1" />
          GiveHope © 2024 • Делаем мир добрее
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Heart,
    title: "100% на благотворительность",
    description:
      "Вся прибыль от продаж направляется на помощь нуждающимся. Прозрачная система отчётности.",
  },
  {
    icon: Shield,
    title: "Проверенные фонды",
    description:
      "Работаем только с официальными благотворительными организациями с подтверждённой репутацией.",
  },
  {
    icon: Gift,
    title: "Качественные товары",
    description:
      "Тщательно отобранные товары от надёжных производителей по справедливым ценам.",
  },
  {
    icon: TrendingUp,
    title: "Прозрачная отчётность",
    description:
      "Видьте, как ваши деньги помогают. Регулярные отчёты о проделанной работе.",
  },
  {
    icon: Users,
    title: "Сообщество добра",
    description:
      "Присоединяйтесь к людям, которые делают мир лучше каждым своим выбором.",
  },
  {
    icon: Globe,
    title: "Доступно всем",
    description:
      "Простая и удобная платформа. Помогайте в любое время из любой точки мира.",
  },
];

const categories = [
  { icon: "📚", name: "Книги" },
  { icon: "👕", name: "Одежда" },
  { icon: "🎨", name: "Искусство" },
  { icon: "🏠", name: "Дом" },
  { icon: "🎁", name: "Подарки" },
  { icon: "🧸", name: "Игрушки" },
  { icon: "⚽", name: "Спорт" },
  { icon: "🎵", name: "Музыка" },
];
