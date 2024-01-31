import { auther } from '../config';
import { RxExternalLink, RxGithubLogo } from 'react-icons/rx';
import styled from 'styled-components';
import { COLOR, FONT } from '../styles/Variables';

const Logo = styled.div`
  color: ${COLOR.primary};
  opacity: 0.4;
  margin: 30px 0;
  font-size: 2rem;
  font-family: ${FONT.logoOutline};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: ${COLOR.textSub};
  font-family: ${FONT.accent};
  font-size: 0.9rem;

  a {
    padding: 5px;
    font-weight: 700;
    &:hover {
      color: ${COLOR.primary};
    }

    svg {
      margin: 0 2px;
      font-size: 0.8rem;
    }
  }
`;

const FOOTER = styled.footer`
  grid-area: footer;
  padding: 40px 40px 150px;
  background-color: ${COLOR.bgSub};
`;

function Footer() {
  return (
    <FOOTER>
      <Logo>PODOAL</Logo>
      <Container>
        <RxGithubLogo />
        <a href={auther.github} target="_blank" rel="noreferrer">
          Github Repository
          <RxExternalLink />
        </a>
      </Container>
      <Container>
        Created by
        <a href={auther.blog} target="_blank" rel="noreferrer">
          {auther.name}
          <RxExternalLink />
        </a>
      </Container>
    </FOOTER>
  );
}

export default Footer;
