import { Metadata } from "next"
import LoginForm from "../ui/login-form"
import { lusitana } from "@/ui/fonts"

export const metadata: Metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className={`${lusitana.className} text-3xl text-white md:w-36`}>
            Azure VM
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
