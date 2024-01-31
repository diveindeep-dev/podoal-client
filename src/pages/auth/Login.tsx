import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { AuthContainer, Label } from './SignUp';

const initialValues: LoginForm = {
  profileId: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const { values, handleChange, resetValues } = useForm({ initialValues });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.profileId || !values.password) {
      return setError('모든 항목을 입력하세요.');
    }

    const loginUser: LoginForm = values;
    try {
      const response = await loginApi(loginUser);
      if (response) {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          setError(response.data.message);
          resetValues();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data.message ||
            `서버가 불안정합니다. 다시 시도해주세요.`,
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
          </Label>
        </div>
        <div>{error}</div>
        <button type="submit">Log In</button>
      </form>
    </AuthContainer>
  );
}

export default Login;
