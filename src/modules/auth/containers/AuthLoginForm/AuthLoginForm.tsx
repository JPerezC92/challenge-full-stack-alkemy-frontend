import React from "react";
import { UserLogin } from "src/modules/auth/dto/UserLogin";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { Button } from "src/modules/shared/components/Button";
import { Input } from "src/modules/shared/components/Input";
import { Label } from "src/modules/shared/components/Label";
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
  const [loginUser] = useCallableRequest(
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded border border-teal-500/50 bg-yellow-500/5 p-4 shadow-md"
      >
        <h1 className="center text-center text-xl font-bold">Login</h1>

        <div>
          <Label htmlFor={ids.email}>{capitalize(names.email)}</Label>
          <Input
            id={ids.email}
            name={names.email}
            onChange={handleChange}
            type="text"
            value={formValues.email}
          />
        </div>

        <div>
          <Label htmlFor={ids.password}>{capitalize(names.password)}</Label>
          <Input
            id={ids.password}
            name={names.password}
            onChange={handleChange}
            type="password"
            value={formValues.password}
          />
        </div>

        <Button primary type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </>
  );
};
