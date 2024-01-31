import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

const LAYOUT = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas:
    'header header'
    'nav main'
    'nav footer';

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main'
      'footer'
      'nav';
  }
`;

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LAYOUT id="App">
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </LAYOUT>
  );
}

export default Layout;
