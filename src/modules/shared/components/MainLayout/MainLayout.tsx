import Link from "next/link";
import React from "react";
import { mainRoutes } from "src/modules/shared/routes/web";

const navList = [
  { name: "Home", route: mainRoutes.home },
  { name: "ABM de operaciones", route: mainRoutes.movements },
] as const;

type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <nav className="flex justify-center gap-5  border-b-2 py-4">
        {navList.map((route) => (
          <Link key={route.route} href={route.route}>
            <a className="rounded-md bg-emerald-300/60 px-3 text-lg font-semibold hover:bg-emerald-300">
              {route.name}
            </a>
          </Link>
        ))}
      </nav>

      <>{children}</>
    </>
  );
};
