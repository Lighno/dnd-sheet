import { Link } from "@tanstack/react-router";

import ClerkHeader from "../integrations/clerk/header-user";
import { ModeToggle } from "./ui/color-theme-toggle";

export default function Header() {
  return (
    <header className="flex justify-between gap-2 bg-white p-2 text-black">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/clerk">Clerk</Link>
        </div>

        <div className="px-2 font-bold">
          <Link
            to="/sheet"
            search={(old) => ({
              section: old.section ?? "abilities",
            })}
          >
            Sheet
          </Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/test">Test</Link>
        </div>
      </nav>

      <div className="flex flex-row gap-2 items-center justify-between">
        <ClerkHeader />
        <ModeToggle />
      </div>
    </header>
  );
}
