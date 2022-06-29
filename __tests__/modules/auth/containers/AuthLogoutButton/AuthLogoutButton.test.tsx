import { act, fireEvent, render, screen } from "@testing-library/react";
import { AuthLogoutButton } from "src/modules/auth/containers/AuthLogoutButton";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";

const onClick = jest.fn();
const accessToken = "accessToken";

const authRepository: AuthRepository = {
  logout: jest.fn().mockResolvedValue(true).mockResolvedValueOnce(false),
} as unknown as AuthRepository;

describe("AuthLogoutButton container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render a button", async () => {
    render(
      <AuthLogoutButton accessToken="" authRepository={() => authRepository}>
        Logout
      </AuthLogoutButton>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should call authRepository.logout and not call onClick", async () => {
    render(
      <AuthLogoutButton
        accessToken={accessToken}
        authRepository={() => authRepository}
        onClick={onClick}
      >
        Logout
      </AuthLogoutButton>
    );

    const logoutButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(authRepository.logout).toHaveBeenCalledTimes(1);
    expect(authRepository.logout).toHaveBeenCalledWith({ accessToken });
    expect(onClick).not.toHaveBeenCalled();
  });

  test("should call authRepository.logout and onClick", async () => {
    render(
      <AuthLogoutButton
        accessToken={accessToken}
        authRepository={() => authRepository}
        onClick={onClick}
      >
        Logout
      </AuthLogoutButton>
    );

    const logoutButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(authRepository.logout).toHaveBeenCalledTimes(1);
    expect(authRepository.logout).toHaveBeenCalledWith({ accessToken });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith();
  });
});
