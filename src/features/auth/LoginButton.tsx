"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const mutation = useMutation({
    mutationFn: async () => signIn(),
  });
  return (
    <Button
      disabled={mutation.isPending}
      variant="outline"
      size="sm"
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogIn className="mr-2" size={12} />
      )}
      Login
    </Button>
  );
}
