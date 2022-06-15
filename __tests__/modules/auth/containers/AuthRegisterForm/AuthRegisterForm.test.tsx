import { act, fireEvent, render, screen } from "@testing-library/react";
import { AuthRegisterForm } from "src/modules/auth/containers/AuthRegisterForm";
import { UserCreate } from "src/modules/auth/dto/UserCreate";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { User } from "src/modules/auth/models/User";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";

const userCreate: UserCreate = {
  email: "test@example.com",
  password: "123478554jhbjsda76",
  firstName: "John",
  lastName: "Doe",
};

const accessCredentials: AccessCredentials = {
  accessToken: "accessToken",
  user: new User({
    id: "123456",
    email: userCreate.email,
    firstName: userCreate.firstName,
    lastName: userCreate.lastName,
  }),
};

const authRepository: AuthRepository = {
  register: jest.fn().mockResolvedValue(accessCredentials),
} as unknown as AuthRepository;

const onSuccess = jest.fn();

describe("AuthRegisterForm container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the login form", () => {
    render(<AuthRegisterForm authRepository={() => authRepository} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/register/i);
  });

  test("should call AuthRepository.register and onSuccess with the correct parameters", async () => {
    render(
      <AuthRegisterForm
        authRepository={() => authRepository}
        onSuccess={onSuccess}
      />
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(firstNameInput, {
        target: { value: userCreate.firstName },
      });
      fireEvent.change(lastNameInput, {
        target: { value: userCreate.lastName },
      });
      fireEvent.change(emailInput, { target: { value: userCreate.email } });
      fireEvent.change(passwordInput, {
        target: { value: userCreate.password },
      });

      fireEvent.click(submitButton);
    });

    expect(true).toBe(true);
    expect(authRepository.register).toHaveBeenCalledTimes(1);
    expect(authRepository.register).toHaveBeenCalledWith(userCreate);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(accessCredentials);
  });
});
