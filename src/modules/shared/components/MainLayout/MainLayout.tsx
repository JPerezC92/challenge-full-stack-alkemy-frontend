import Link from "next/link";
import React from "react";
import { mainRoutes } from "../../routes/web";

import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          border: "1px solid black",
        }}
      >
        <Link href={mainRoutes.home}>
          <a>Home</a>
        </Link>

        <Link href={mainRoutes.movements}>
          <a>ABM de operaciones</a>
        </Link>
      </nav>

      <main>{children}</main>
    </>
  );
};
