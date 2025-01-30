import { signIn, signOut, useSession } from "next-auth/react";
import {Button} from "@heroui/react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub, FaGoogle } from "react-icons/fa"; // 

export default function LoginForm() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center space-y-4">
      {session ? (
        <div className="flex flex-col items-center space-y-4">
          <p>Welcome, {session.user?.name}!</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Button
            onPress={() => signIn("google")}
            color="secondary"
            className="px-4 py-2 text-white rounded"
          >
            <FcGoogle className="w-5 h-5" />

            Login with Google
          </Button>
          <Button
            onPress={() => signIn("github")}
            color="secondary"
            className="px-4 py-2 text-white rounded"
          >
            <FaGithub className="w-5 h-5" />
            Login with Github
          </Button>
        </div>
      )}
    </div>
  );
}
