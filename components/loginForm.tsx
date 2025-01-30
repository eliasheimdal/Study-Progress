import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginForm() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center space-y-4">
      {session ? (
        <div className="flex flex-col items-center space-y-4">
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-500 text-white rounded">
          Login with Google
        </button>
      )}
    </div>
  );
}