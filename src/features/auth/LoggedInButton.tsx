"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, // Corrected: AlertDialogContent is now imported from here
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react"; // LogIn is still imported but LogOut will be used in confirmation
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export default function LoggedInButton(props: LoggedInButtonProps) {
  const mutation = useMutation({
    mutationFn: async () => signOut(),
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <Avatar className="mr-2 h-6 w-6">
            <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
            {props.user.image && (
              <AvatarImage
                src={props.user.image}
                alt={props.user.name || "user's avatar"}
              />
            )}
          </Avatar>
          {props.user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <LogOut className="mr-2" size={12} />
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancel</Button>
              </AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? (
                  <Loader className="mr-2" size={12} />
                ) : (
                  <LogOut className="mr-2" size={12} />
                )}
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
