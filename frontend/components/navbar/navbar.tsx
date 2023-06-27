import { Sparkles } from "lucide-react";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { Separator } from "../ui/separator";

export default function Navbar() {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-base font-bold"
          >
            <Sparkles size={18} />
            Prompt Store
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
}
