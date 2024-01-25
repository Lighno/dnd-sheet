// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import { siteConfig } from "~/config/site";
import { buttonVariants } from "~/components/ui/button";

async function GetExample() {
  "use server";
  const session = await getServerAuthSession();
  if (!session) {
    return "No session";
  }
  return (
    <span>{session.user.name ?? session.user.email ?? session.user.id}</span>
  );
}

async function UserInfo() {
  "use server";
  const session = await getServerAuthSession();
  if (!session?.user.image) {
    return null;
  }
  return (
    <div className="flex flex-row justify-between gap-3">
      <div className="flex flex-col justify-center">
        {session.user.name ?? session.user.email}
      </div>
      <Image
        src={session.user.image}
        className="block w-10"
        width={256}
        height={256}
        alt="Avatar"
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}
