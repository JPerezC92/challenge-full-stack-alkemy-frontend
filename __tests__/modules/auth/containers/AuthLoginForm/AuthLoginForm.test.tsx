import { act, fireEvent, render, screen } from "@testing-library/react";
import { AuthLoginForm } from "src/modules/auth/containers/AuthLoginForm";
import { UserLogin } from "src/modules/auth/dto/UserLogin";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { User } from "src/modules/auth/models/User";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";

const loginUser: UserLogin = {
  email: "email@example.com",
  password: "password125645",
};

const accessCredentials: AccessCredentials = {
  accessToken: "accessToken",
  user: new User({
    id: "234654564213",
    email: loginUser.email,
    firstName: "John",
    lastName: "Doe",
  }),
};

const onSuccess = jest.fn();

const authRepository: AuthRepository = {
  login: jest.fn().mockResolvedValue(accessCredentials),
} as unknown as AuthRepository;

describe("AuthLoginForm container", () => {
  test("should render the login form", () => {
    render(<AuthLoginForm authRepository={() => authRepository} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });

  test("should call login method when form is submitted", async () => {
    render(
      <AuthLoginForm
        authRepository={() => authRepository}
        onSuccess={onSuccess}
      />
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: loginUser.email } });
      fireEvent.change(passwordInput, {
        target: { value: loginUser.password },
      });

      fireEvent.click(submitButton);
    });

    expect(authRepository.login).toHaveBeenCalledTimes(1);
    expect(authRepository.login).toHaveBeenCalledWith(loginUser);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(accessCredentials);
  });
});
