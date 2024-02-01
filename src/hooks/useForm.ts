import { ChangeEvent, useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
}

const useForm = <T>({ initialValues }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T>(initialValues);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const resetValues = () => {
    setValues(initialValues);
  };

  const checkAllRequired = () => {
    let newErrors: any = {};

    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        newErrors[key] = '* 필수항목입니다.';
      }
    }

    setErrors({ ...errors, ...newErrors });
  };

  return {
    values,
    setValues,
    handleChange,
    resetValues,
    checkAllRequired,
    errors,
    setErrors,
  };
};

export default useForm;
