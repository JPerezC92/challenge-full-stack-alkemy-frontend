import React, { useCallback, useId } from "react";
import { MapToStringValues } from "./MapToStringValues";

type UseFormProps<Values, T = MapToStringValues<Values>> = {
  initialValues: T;
  onSubmit?: (values: T, resetValues: () => void) => void;
};

export const useForm = <Values = Record<string, unknown>>(
  props: UseFormProps<Values>
) => {
  const { initialValues, onSubmit } = props;
  const id = useId();

  const [values, setValues] = React.useState(initialValues);
  const [validity, setValidity] = React.useState(() =>
    Object.keys(initialValues).reduce(
      (prev, current) => ({ ...prev, [current]: false }),
      {} as { [k in keyof Values]: boolean }
    )
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const valid = event.target.validity.valid;
      const { name, value } = event.target;

      setValues((s) => ({ ...s, [name]: value }));
      setValidity((s) => ({ ...s, [name]: valid }));
    },
    []
  );

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!event.currentTarget.checkValidity()) return;
      onSubmit && onSubmit(values, resetValues);
    },
    [resetValues, onSubmit, values]
  );

  const names = Object.entries(initialValues).reduce((acc, [name]) => {
    return { ...acc, [name]: name };
  }, {} as { [k in keyof Values]: k });

  useId();

  const ids = Object.entries(initialValues).reduce((acc, [name]) => {
    return { ...acc, [name]: id + name };
  }, {} as { [k in keyof Values]: k });

  return {
    isValidForm: (Object.values(validity) as boolean[]).every((v) => v),
    handleChange,
    handleSubmit,
    formValues: values,
    names,
    ids,
    resetValues,
  };
};
