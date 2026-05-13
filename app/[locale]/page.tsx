import { Header } from "@/components/layout/header"
import { auth } from "@/lib/auth"
import { ActionButton } from "@/components/home/action-button"
import { getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/config"
import Image from "next/image"
export const runtime = "edge"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeFromParams } = await params
  const locale = localeFromParams as Locale
  const session = await auth()
  const t = await getTranslations({ locale, namespace: "home" })

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1600px]">
        <Header />
        <main className="pt-16">
          <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-2 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-grid-primary/5" />

            <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 py-4">
              <div className="flex justify-center">
                <Image
                  src="/nuonuo.png"
                  alt="Nuonuo"
                  width={700}
                  height={550}
                  className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {t("title")}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 tracking-wide">
                  {t("subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0">
                <ActionButton isLoggedIn={!!session} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

