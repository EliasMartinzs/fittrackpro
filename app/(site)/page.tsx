import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cartaoSite } from "@/lib/constants";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";

export default function Site() {
  return (
    <main className="space-y-16 my-5 mx-5 lg:mx-20 ocultar-scrollbar">
      <header className="h-14 border border-foreground/50 rounded-full">
        <nav className="w-full h-full flex items-center justify-between px-8">
          <Link
            href="/"
            className="text-2xl bg-gradient-to-r from-foreground/70 to-primary text-transparent bg-clip-text"
          >
            Fitnesee
          </Link>
          <div>
            <ul className="flex items-center gap-10 font-extralight">
              <li className="hover:underline underline-offset-4 hover:text-primary transition-colors">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:underline underline-offset-4 hover:text-primary transition-colors">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-1 justify-center"
                >
                  Entrar <IoIosLogIn className="size-5" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="flex flex-col gap-y-10 items-center justify-center">
        <div>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants(),
              "border border-primary rounded-full bg-gradient-to-tr from-primary/40 via-primary/50 to-primary/90 hover:bg-gradient-to-br transition-colors min-w-64 font-medium uppercase"
            )}
          >
            FitTrack Pro for life
          </Link>
        </div>

        <div className="text-center max-w-sm lg:max-w-lg mx-auto flex flex-col items-center justify-center gap-y-6">
          <h4 className="font-bold text-4xl">
            Eleve sua jornada{" "}
            <span className="bg-gradient-to-r from-foreground/80 via-primary/90 to-primary text-transparent bg-clip-text">
              Fitness{" "}
            </span>{" "}
            com{" "}
            <span className="bg-gradient-to-r from-foreground/80 via-primary/90 to-primary text-transparent bg-clip-text">
              FitTrack Pro
            </span>
          </h4>

          <p className="text-muted-foreground">
            Gerencie treinos e dietas com facilidade. Alcance seus objetivos de
            forma eficiente
          </p>

          <div className="flex">
            <Input
              placeholder="Entre com seu E-Mail"
              className="rounded-l-full bg-accent h-12 placeholder:text-base"
            />
            <Button className="bg-primary rounded-r-full transition-colors hover:bg-primary/80 h-12">
              Se Inscrever
            </Button>
          </div>
        </div>
      </section>

      <section className="max-sm:space-y-2 lg:grid grid-cols-3 lg:gap-2">
        {cartaoSite.map(({ icon, title, description }, index) => {
          const Icon = icon;

          return (
            <Card
              key={title}
              className={clsx("p-5", {
                "bg-gradient-to-tr from-background via-primary/5 to-primary/20 border-r border-r-primary/50":
                  index === 0,
                "border border-primary": index === 1,
                "bg-gradient-to-tl from-background via-primary/5 to-primary/20 border-l border-l-primary/50":
                  index === 2,
              })}
            >
              <CardHeader className="flex items-center gap-y-3">
                <Icon className="size-20" />
                <CardTitle className="text-muted-foreground">{title}</CardTitle>
                <CardDescription className="text-center">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
