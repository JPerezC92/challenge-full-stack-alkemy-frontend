import React from "react";
import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { Button } from "src/modules/shared/components/Button";
import { Input } from "src/modules/shared/components/Input";
import { Label } from "src/modules/shared/components/Label";
import { RequiredField } from "src/modules/shared/components/RequiredField";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import {
  emailValidator,
  lettersValidator,
  passwordValidator,
} from "src/modules/shared/utils/validators";

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
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
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
          <Label htmlFor={ids.firstName}>
            First name <RequiredField />
          </Label>
          <Input
            autoFocus
            type="text"
            name={names.firstName}
            id={ids.firstName}
            value={formValues.firstName}
            onChange={handleChange}
            pattern={lettersValidator.source}
            placeholder="e.g. John"
            title="Should only contain letters. e.g. John"
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.lastName}>
            Last name <RequiredField />
          </Label>
          <Input
            type="text"
            name={names.lastName}
            id={ids.lastName}
            value={formValues.lastName}
            onChange={handleChange}
            pattern={lettersValidator.source}
            placeholder="e.g. Doe"
            title="Should only contain letters. e.g. Doe"
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.email}>
            {names.email} <RequiredField />
          </Label>
          <Input
            type="email"
            name={names.email}
            id={ids.email}
            value={formValues.email}
            onChange={handleChange}
            pattern={emailValidator.source}
            placeholder="e.g john@domain.com"
            title="Should contain a valid email address. e.g. john@domain.com"
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.password}>
            {names.password} <RequiredField />
          </Label>

          <Input
            type="password"
            name={names.password}
            id={ids.password}
            value={formValues.password}
            onChange={handleChange}
            data-testid="password"
            pattern={passwordValidator.source}
            title="Should contain 8 characters, numbers, letters (uppercase, lowercase)"
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.confirmPassword}>
            Confirm Password <RequiredField />
          </Label>
          <Input
            type="password"
            name={names.confirmPassword}
            id={ids.confirmPassword}
            value={formValues.confirmPassword}
            onChange={handleChange}
            data-testid="confirm-password"
            pattern={formValues.password}
            title="Should match the password"
            required
          />
        </div>

        <Button primary type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
