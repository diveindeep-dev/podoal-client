import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/slice';
import styled from 'styled-components';
import { COLOR, FONT } from '../styles/Variables';
import { ContentContainer, ButtonStyle } from '../styles/Common';

const Logout = styled.div`
  ${ButtonStyle}
  color: ${COLOR.primary};
  border: 1px solid ${COLOR.primary};
  &:hover {
    background-color: ${COLOR.bgSub};
  }
`;

const User = styled.div`
  margin: 0 10px;
  font-size: 0.9rem;
  font-family: ${FONT.accent};
`;

const Logo = styled(Link)`
  color: ${COLOR.primary};
  font-size: 1.2rem;
  font-family: ${FONT.logo};
`;

const LINK = styled(Link)`
  ${ButtonStyle}
  margin: 0 3px;

  &.login {
    color: ${COLOR.primary};
    border: 1px solid ${COLOR.primary};
    &:hover {
      color: ${COLOR.bg};
      background-color: ${COLOR.primary};
    }
  }

  &.signup {
    color: ${COLOR.bg};
    background-color: ${COLOR.primary};
    border: 1px solid ${COLOR.primary};

    &:hover {
      color: ${COLOR.text};
      background-color: ${COLOR.accent};
      border: 1px solid ${COLOR.accent};
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HEADER = styled.header`
  grid-area: header;
  ${ContentContainer}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  const loginUser = useSelector((state: State) => state.auth.loginUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <HEADER>
      <Logo to="/">PODOAL</Logo>
      <AuthContainer>
        {loginUser ? (
          <>
            <User>{loginUser.name}</User>
            <Logout onClick={() => dispatch(logout())}>로그아웃</Logout>
          </>
        ) : (
          <>
            <LINK to="login" className="login">
              Login
            </LINK>
            <LINK to="signup" className="signup">
              Sign Up
            </LINK>
          </>
        )}
      </AuthContainer>
    </HEADER>
  );
}

export default Header;
