import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR, FONT } from '../styles/Variables';
import { ContentContainer, ButtonStyle } from '../styles/Common';

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
  return (
    <HEADER>
      <Logo to="/">PODOAL</Logo>
      <AuthContainer>
        <LINK to={`/login`} className="login">
          Login
        </LINK>
        <LINK to={`/signup`} className="signup">
          Sign Up
        </LINK>
      </AuthContainer>
    </HEADER>
  );
}

export default Header;
