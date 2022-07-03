import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { PrivateRoute } from "src/modules/auth/containers/PrivateRoute";
import { PublicRoute } from "src/modules/auth/containers/PublicRoute";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import * as useNodeAuthRepository from "src/modules/auth/service/useNodeAuth.repository";

jest.mock("next/dist/client/router", () => ({
  __esModule: true,
  useRouter: () => ({
    replace: jest.fn(() => Promise.resolve(true)),
    push: jest.fn(() => Promise.resolve(true)),
  }),
}));

const accessCredentials: AccessCredentials = {
  accessToken: "accessToken",
  user: {
    id: "145645",
    firstName: "John",
    lastName: "Doe",
    email: "email@example.com",
  },
};

const authRepository: AuthRepository = {
  refreshToken: jest
    .fn()
    .mockResolvedValueOnce(undefined)
    .mockResolvedValueOnce(undefined)
    .mockResolvedValue(accessCredentials),
  login: jest.fn(),
  register: jest.fn(),
} as unknown as AuthRepository;

jest
  .spyOn(useNodeAuthRepository, "useNodeAuthRepository")
  .mockReturnValue(() => authRepository);

describe("AuthenticationLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("the PrivateRoute should not render the component", async () => {
    render(
      <AuthenticationLayout Route={PrivateRoute}>
        <div>Testing</div>
      </AuthenticationLayout>
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/verifiying/i));

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("the PublicRoute should render the component", async () => {
    render(
      <AuthenticationLayout Route={PublicRoute}>
        <div>Testing</div>
      </AuthenticationLayout>
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/verifiying/i));

    expect(await screen.findByText(/testing/i)).toBeInTheDocument();
  });

  test("the PrivateRoute should render the component", async () => {
    render(
      <AuthenticationLayout Route={PrivateRoute}>
        <div>Testing</div>
      </AuthenticationLayout>
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/verifiying/i));

    expect(screen.getByText(/testing/i)).toBeInTheDocument();
  });

  test("the PublicRoute should not render the component", async () => {
    render(
      <AuthenticationLayout Route={PublicRoute}>
        <div>Testing</div>
      </AuthenticationLayout>
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/verifiying/i));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
