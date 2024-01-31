import { FocusEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { checkDuplicateIdApi, signUpApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { validation } from '../../utils/regex';
import styled from 'styled-components';
import { COLOR, FONT } from '../../styles/Variables';
import { ButtonStyle, ContentContainer } from '../../styles/Common';

interface StyleProps {
  $passColor?: string;
}

const Error = styled.div<StyleProps>`
  height: 20px;
  color: ${({ $passColor }) =>
    $passColor ? COLOR[$passColor as keyof typeof COLOR] : COLOR.red};
  font-size: 0.9rem;
  font-weight: 400;
  text-align: end;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  color: ${COLOR.text};
  font-weight: 500;

  input {
    margin: 5px 0;
    padding: 5px 0;
    font-size: 0.9rem;
    border-bottom: 1px solid ${COLOR.textSub};
    &:focus {
      border-bottom: 1px solid ${COLOR.primary};
    }
  }
  &:focus-within {
    color: ${COLOR.primary};
    font-weight: 700;
  }
`;

export const AuthContainer = styled.div`
  ${ContentContainer}
  h1 {
    font-family: ${FONT.accent};
  }

  form {
    padding: 30px 0;
    font-family: ${FONT.accent};

    button {
      ${ButtonStyle}
      width: 100%;
      padding: 15px;
      margin: 10px 0;
      color: ${COLOR.bg};
      background-color: ${COLOR.primary};
      font-weight: 500;
    }
  }
`;

const initialValues: SignUpForm = {
  profileId: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

function SignUp() {
  const navigate = useNavigate();
  const { values, handleChange, resetValues } = useForm({ initialValues });
  const [errors, setErrors] = useState<SignUpForm>(initialValues);
  const [error, setError] = useState<string>('');
  const [isPass, setIsPass] = useState<boolean | null>(null);

  const checkSamePassword = (): string => {
    const { password, passwordConfirm } = values;
    if (password !== passwordConfirm) {
      return '비밀번호와 비밀번호 확인 항목이 서로 일치하지 않습니다.';
    } else {
      return '';
    }
  };

  const checkBlank = () => {
    let newErrors: any = {};

    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        newErrors[key] = '필수 항목입니다.';
      }
    }
    setErrors({ ...errors, ...newErrors });
  };

  const handleOnBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (!value) {
      return setErrors({ ...errors, [name]: '필수 항목입니다.' });
    }

    const getMessage = (): string => {
      return validation[name as keyof typeof validation](value) || '';
    };

    switch (name) {
      case 'passwordConfirm':
        return setErrors({ ...errors, passwordConfirm: checkSamePassword() });

      case 'password':
        if (values.passwordConfirm) {
          setErrors({
            ...errors,
            passwordConfirm: checkSamePassword(),
          });
        }
        return setErrors({
          ...errors,
          password: getMessage(),
        });

      case 'profileId':
        if (!getMessage()) {
          try {
            const response = await checkDuplicateIdApi(values.profileId);
            if (response.status === 200) {
              setIsPass(true);
              return setErrors({
                ...errors,
                profileId: response.data.message,
              });
            }
          } catch (error) {
            if (error instanceof AxiosError) {
              setIsPass(false);
              return setErrors({
                ...errors,
                profileId:
                  error.response?.data.message ||
                  '서버가 불안정합니다. 잠시후 다시 시도해주세요.',
              });
            }
          }
        } else {
          setIsPass(null);
          return setErrors({
            ...errors,
            profileId: getMessage(),
          });
        }
        break;

      case 'name':
      default:
        return setErrors({
          ...errors,
          [name]: getMessage(),
        });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        return checkBlank();
      }
    }

    if (!isPass) {
      return setErrors({
        ...errors,
        profileId: '아이디를 중복체크해주세요.',
      });
    }

    if (isPass && !errors.name && !errors.password && !errors.passwordConfirm) {
      const newUser: AuthForm = {
        profileId: values.profileId,
        name: values.name,
        password: values.password,
      };

      try {
        const response = await signUpApi(newUser);
        if (response) {
          if (response.status === 201) {
            navigate('/login');
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
    }
  };

  return (
    <AuthContainer>
      <h1>Sign Up</h1>
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
              onBlur={handleOnBlur}
            />
            <Error $passColor={isPass ? 'blue' : 'red'}>
              {errors.profileId}
            </Error>
          </Label>
          <Label>
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="프로필로 사용할 이름을 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <Error>{errors.name}</Error>
          </Label>
          <Label>
            Password
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <Error>{errors.password}</Error>
          </Label>
          <Label>
            Password Confirm
            <input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              placeholder="위의 비밀번호와 일치해야 합니다."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <Error>{errors.passwordConfirm}</Error>
          </Label>
        </div>
        <div>{error}</div>
        <button type="submit">가입하기</button>
      </form>
    </AuthContainer>
  );
}

export default SignUp;
