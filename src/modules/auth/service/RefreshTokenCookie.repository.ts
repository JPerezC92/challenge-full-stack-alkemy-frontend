import Cookies from "js-cookie";

export function RefreshTokenCookieRepository() {
  const cookieName = "refresh-token";
  return {
    save: (refreshToken: string): void => {
      Cookies.set(cookieName, refreshToken, {
        expires: 1,
        path: "/",
        sameSite: "strict",
        secure: true,
      });
    },
    get: (): string => Cookies.get(cookieName) || "",
    remove: (): void => Cookies.remove(cookieName),
  };
}
