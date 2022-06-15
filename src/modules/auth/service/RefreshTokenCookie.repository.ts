import Cookies from "js-cookie";

export function RefreshTokenCookieRepository() {
  const cookieName = "refreshToken";
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
  };
}
