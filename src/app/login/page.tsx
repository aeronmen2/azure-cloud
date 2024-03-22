import { Metadata } from "next"
import LoginForm from "../../ui/login-form"
import { lusitana } from "@/ui/fonts"
import { users } from "@/data/users"

export const metadata: Metadata = {
  title: "Login",
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="grid grid-cols-2 gap-4 mx-auto w-full max-w-[800px] md:-mt-32">
        <div className="col-span-1">
          <div className="flex flex-col space-y-2.5 p-4">
            <div className="flex h-20 items-end rounded-lg bg-blue-600 p-3 md:h-36">
              <div
                className={`${lusitana.className} text-xl text-white md:text-3xl md:leading-normal`}
              >
                Azure VM
              </div>
            </div>
            <div className="text-gray-700">
              <p>You have {users.length} users to test.</p>
              {users.map((user) => (
                <div key={user.id} className="items-center">
                  <div>User: {user.username}</div>
                  <div>Password: {user.password}</div>
                  <div>Role: {user.role}</div>
                  <div>Description: {user.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
