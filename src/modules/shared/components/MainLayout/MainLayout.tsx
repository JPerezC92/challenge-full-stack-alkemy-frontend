import Link from "next/link";
import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useAuthenticationState } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { AuthenticationActionType } from "src/modules/auth/components/AuthenticationLayout/state/authenticationAction";
import { AuthLogoutButton } from "src/modules/auth/containers/AuthLogoutButton";
import { useCredentialsState } from "src/modules/auth/containers/PrivateRoute/CredentialsProvider.context";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { mainRoutes } from "src/modules/shared/routes/web";
import { useToggle } from "../../hooks/useToggle";

const navList = [
  { name: "Home", route: mainRoutes.home },
  { name: "Operations", route: mainRoutes.movements },
] as const;

type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { authenticationDispatch } = useAuthenticationState();
  const { accessToken } = useCredentialsState();
  const authRepository = useNodeAuthRepository();
  const [isActive, toggle] = useToggle();

  const handleLogout = () => {
    authenticationDispatch({
      type: AuthenticationActionType.Logout,
    });
  };

  return (
    <>
      <div className="m-auto max-w-screen-lg">
        <header className="rounded-b-md bg-indigo-600 drop-shadow-sm">
          <div className="flex items-center justify-between p-3 text-white">
            <i className="text-2xl">
              <FaRegMoneyBillAlt />
            </i>

            <nav className="hidden sm:block">
              {navList.map((route) => (
                <Link key={route.route} href={route.route}>
                  <a className="rounded-md px-3 py-2 text-base font-semibold hover:bg-black/10">
                    {route.name}
                  </a>
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggle}
              className="rounded-md p-1 text-2xl transition-colors ease-in-out hover:bg-slate-700 hover:text-white sm:hidden"
            >
              <i>
                <HiMenu />
              </i>
            </button>

            <AuthLogoutButton
              authRepository={authRepository}
              accessToken={accessToken}
              onClick={handleLogout}
            >
              Logout
            </AuthLogoutButton>
          </div>

          <nav
            className={`${
              isActive ? "flex" : "hidden"
            } flex-col gap-1 p-2 sm:hidden `}
          >
            {navList.map((route) => (
              <Link key={route.route} href={route.route}>
                <a
                  className="rounded-md px-3 py-2 text-base font-semibold text-white transition-colors ease-in-out hover:bg-black/30"
                  onClick={toggle}
                >
                  {route.name}
                </a>
              </Link>
            ))}
          </nav>
        </header>

        <div className="p-4">
          <>{children}</>
        </div>
      </div>
    </>
  );
};
