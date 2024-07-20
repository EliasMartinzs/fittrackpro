"use client";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { pegarHorarioDoDia } from "@/lib/utils";
import { usarMobileSheet } from "@/sheets/usar-mobile-sheet";
import { SignOutButton, useUser } from "@clerk/nextjs";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft } from "lucide-react";
import { IconesSideBar } from "../global/icones-side-bar";
import { IoIosLogOut } from "react-icons/io";

export const MobileSheet = () => {
  const { estaAberto, fechar } = usarMobileSheet();
  const { user } = useUser();

  return (
    <Sheet open={estaAberto} onOpenChange={fechar}>
      <SheetContent side="left" closeClassName="hidden">
        <SheetHeader className="flex flex-row items-center justify-between mb-8">
          <div className="text-start flex items-center gap-2 text-muted-foreground">
            <p className="text-2xl font-medium">Boa {pegarHorarioDoDia()},</p>{" "}
            <p className="text-2xl font-medium">{user?.firstName || "Elias"}</p>
          </div>

          <div>
            <SheetPrimitive.Close>
              <div className="size-10 bg-accent rounded-xl hover:bg-accent/80 grid place-items-center">
                <ChevronLeft />
              </div>
            </SheetPrimitive.Close>
          </div>
        </SheetHeader>
        <IconesSideBar fechar={fechar} />
        <div className="absolute bottom-10 flex flex-col gap-y-7">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(1)}
              </AvatarFallback>
            </Avatar>

            <p className="text-muted-foreground">
              {user?.emailAddresses?.at(0)?.emailAddress}
            </p>
          </div>

          <SignOutButton>
            <div className="flex items-center gap-3 ml-1">
              <IoIosLogOut className="size-6" />{" "}
              <p className="text-muted-foreground">Sair</p>
            </div>
          </SignOutButton>
        </div>
      </SheetContent>
    </Sheet>
  );
};
