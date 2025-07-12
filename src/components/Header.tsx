import { Link } from "@tanstack/react-router";

import ClerkHeader from "../integrations/clerk/header-user";
import { ModeToggle } from "./ui/color-theme-toggle";
import Button from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background text-foreground flex justify-between gap-2 p-2">
      <nav className="flex flex-row">
        <Button variant="link">
          <Link to="/">Home</Link>
        </Button>

        <Button variant="link">
          <Link to="/demo/clerk">Clerk</Link>
        </Button>

        <Button variant="link">
          <Link
            to="/sheet"
            search={(old) => ({
              section: old.section ?? "abilities",
            })}
          >
            Sheet
          </Link>
        </Button>

        <Button variant="link">
          <Link to="/test">Test</Link>
        </Button>
      </nav>

      <div className="flex flex-row items-center justify-between gap-2">
        <ClerkHeader />
        <ModeToggle />
      </div>
    </header>
  );
}
