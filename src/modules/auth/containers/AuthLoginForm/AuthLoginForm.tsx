import React from "react";
import { UserLogin } from "src/modules/auth/dto/UserLogin";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { capitalize } from "src/modules/shared/utils/capitalize";

type AuthLoginFormProps = {
  authRepository: MyRepository<AuthRepository>;
  onSuccess?: (accessCredentials: AccessCredentials) => void;
};

export const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  authRepository,
  onSuccess,
}) => {
  const { execute: loginUser } = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      return async (userLogin: UserLogin) => {
        const accessCredentials = await _authRepository.login(userLogin);

        if (!accessCredentials) return;

        onSuccess?.(accessCredentials);
      };
    },
    [authRepository, onSuccess]
  );

  const { formValues, ids, names, handleChange, handleSubmit } =
    useForm<UserLogin>({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        loginUser(values);
      },
    });

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={ids.email}>{capitalize(names.email)}</label>
          <input
            id={ids.email}
            name={names.email}
            onChange={handleChange}
            type="text"
            value={formValues.email}
          />
        </div>

        <div>
          <label htmlFor={ids.password}>{capitalize(names.password)}</label>
          <input
            id={ids.password}
            name={names.password}
            onChange={handleChange}
            type="text"
            value={formValues.password}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};
