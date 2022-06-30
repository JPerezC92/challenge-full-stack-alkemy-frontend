import {
  act,
  fireEvent,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import { AuthRegisterForm } from "src/modules/auth/containers/AuthRegisterForm";
import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { User } from "src/modules/auth/models/User";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";

const userCreate: UserRegister = {
  email: "test@example.com",
  password: "1234546789aA",
  firstName: "John",
  lastName: "Doe",
  confirmPassword: "1234546789aA",
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

  test("should render the register form", () => {
    render(<AuthRegisterForm authRepository={() => authRepository} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/submit/i);
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
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
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

      fireEvent.change(confirmPasswordInput, {
        target: { value: userCreate.confirmPassword },
      });

      fireEvent.submit(submitButton);
    });

    expect(authRepository.register).toHaveBeenCalledTimes(1);
    expect(authRepository.register).toHaveBeenCalledWith(userCreate);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(accessCredentials);
  });
});
