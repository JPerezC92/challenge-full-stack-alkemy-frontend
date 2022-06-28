import React from "react";
import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { Button } from "src/modules/shared/components/Button";
import { Input } from "src/modules/shared/components/Input";
import { Label } from "src/modules/shared/components/Label";
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
  const [resgisterUser] = useCallableRequest(
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
      <form
        className="flex flex-col gap-4 rounded border border-teal-500/50 bg-yellow-500/5 p-4 shadow-md"
        onSubmit={handleSubmit}
        role="form"
      >
        <h1 className="center text-center text-xl font-bold">Create account</h1>

        <div>
          <Label htmlFor={ids.firstName}>First name</Label>
          <Input
            type="text"
            name={names.firstName}
            id={ids.firstName}
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor={ids.lastName}>Last name</Label>
          <Input
            type="text"
            name={names.lastName}
            id={ids.lastName}
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor={ids.email}>{capitalize(names.email)}</Label>
          <Input
            type="email"
            name={names.email}
            id={ids.email}
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor={ids.password}>{capitalize(names.password)}</Label>

          <Input
            type="password"
            name={names.password}
            id={ids.password}
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <Button primary type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
