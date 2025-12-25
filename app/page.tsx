"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import Link from "next/link";
// import TradingStats from '@/components/TradingStats'
// import MarketIndicator from '@/components/MarketIndicator'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
              <Zap className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-300">
                ТОРГУЙТЕ С ИНТЕЛЛЕКТОМ
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlphaTrade
              </span>
              <br />
              <span className="text-white">Профессиональная платформа</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Торгуйте криптовалютой, акциями и форекс с передовыми
              инструментами анализа и молниеносной скоростью исполнения ордеров.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Начать торговлю
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700 hover:bg-white/10 transition-all duration-300">
                <BarChart3 className="mr-2 w-5 h-5" />
                Демо-счет
              </button>
            </div>
          </motion.div>

          {/* Trading Stats */}
          <div className="mt-20">{/* <TradingStats /> */}</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Почему выбирают <span className="text-cyan-400">AlphaTrade</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-6">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Indicator */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">{/* <MarketIndicator /> */}</div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl p-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />

            <h2 className="text-4xl font-bold mb-6 relative z-10">
              Готовы покорить финансовые рынки?
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
              Присоединяйтесь к 500,000+ трейдерам, которые уже используют
              AlphaTrade
            </p>

            <Link
              href="/dashboard/login"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 relative z-10
              "
            >
              Создать аккаунт
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "Молниеносная скорость",
    description:
      "Исполнение ордеров за 0.01 секунды с нашей продвинутой торговой инфраструктурой",
  },
  {
    icon: Shield,
    title: "Максимальная безопасность",
    description:
      "Банковский уровень защиты средств и данных с холодным хранением активов",
  },
  {
    icon: BarChart3,
    title: "Профессиональный анализ",
    description: "Встроенные инструменты технического анализа и AI-прогнозы",
  },
  {
    icon: TrendingUp,
    title: "Доступные рынки",
    description: "Торгуйте 1000+ активов: криптовалюта, акции, форекс, товары",
  },
  {
    icon: Users,
    title: "Сообщество трейдеров",
    description: "Общайтесь с опытными трейдерами и перенимайте их стратегии",
  },
  {
    icon: Globe,
    title: "Доступ из любой точки",
    description: "Полнофункциональная платформа на всех устройствах 24/7",
  },
];
