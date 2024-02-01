import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { AuthContainer, Error, Label } from './SignUp';
import { toast } from '../../components/toast';

const initialValues: LoginForm = {
  profileId: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const { values, handleChange, errors, setErrors, checkAllRequired } = useForm(
    {
      initialValues,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        return checkAllRequired();
      }
      setErrors(initialValues);
    }

    const loginUser: LoginForm = values;
    try {
      const response = await loginApi(loginUser);
      if (response) {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            '서버가 불안정합니다. 다시 시도해주세요.',
        );
      }
    }
  };

  return (
    <AuthContainer>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>
            ID
            <input
              type="text"
              name="profileId"
              value={values.profileId}
              placeholder="아이디를 입력해주세요."
              onChange={handleChange}
            />
            <Error>{errors.profileId}</Error>
          </Label>
          <Label>
            Password
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
            />
            <Error>{errors.password}</Error>
          </Label>
        </div>
        <button type="submit">로그인</button>
      </form>
    </AuthContainer>
  );
}

export default Login;
