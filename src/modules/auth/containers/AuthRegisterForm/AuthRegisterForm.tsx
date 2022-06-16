import React from "react";
import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { capitalize } from "src/modules/shared/utils/capitalize";

type AuthRegisterFormProps = {
  authRepository: MyRepository<AuthRepository>;
  onSuccess?: (props: AccessCredentials) => void;
};

export const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  authRepository,
  onSuccess,
}) => {
  const { execute: resgisterUser } = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      return async (userCreate: UserRegister) => {
        const result = await _authRepository.register(userCreate);

        if (!result) return;

        onSuccess?.(result);
      };
    },
    [authRepository, onSuccess]
  );

  const { formValues, ids, names, handleChange, handleSubmit } =
    useForm<UserRegister>({
      initialValues: { firstName: "", lastName: "", email: "", password: "" },
      onSubmit: async (values) => {
        await resgisterUser(values);
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <div>
          <label htmlFor={ids.firstName}>First name</label>
          <input
            type="text"
            name={names.firstName}
            id={ids.firstName}
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={ids.lastName}>Last name</label>
          <input
            type="text"
            name={names.lastName}
            id={ids.lastName}
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={ids.email}>{capitalize(names.email)}</label>
          <input
            type="email"
            name={names.email}
            id={ids.email}
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={ids.password}>{capitalize(names.password)}</label>

          <input
            type="password"
            name={names.password}
            id={ids.password}
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};
