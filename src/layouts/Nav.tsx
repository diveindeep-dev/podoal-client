import { NavLink } from 'react-router-dom';
import { navList } from '../config';
import { IoApps, IoHomeSharp } from 'react-icons/io5';
import { LuGrape, LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { COLOR, FONT } from '../styles/Variables';
import { flexCenter } from '../styles/Common';
import { media } from '../styles/Mixin';

const Icon = styled.div`
  ${flexCenter}
  margin: 0 5px;
  padding: 5px;
  width: 34px;
  height: 34px;
  color: ${COLOR.textSub};
  font-size: 1.3rem;
  background-color: ${COLOR.bgSub};
  border-radius: 5px;

  ${media.mobile} {
    width: 30px;
    height: 30px;
  }
`;

const Name = styled.div`
  padding: 0 10px;
  min-width: 75px;
  font-size: 0.9rem;

  ${media.mobile} {
    padding: 2px 5px;
    text-align: center;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 10px 5px;
  font-family: ${FONT.accent};
  font-weight: 300;

  &:hover {
    font-weight: 500;
  }

  &.active {
    font-weight: 500;
    ${Icon} {
      background-color: ${COLOR.primary};
      color: ${COLOR.bg};
    }
  }
`;

const NAV = styled.nav`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  border-right: 1px solid ${COLOR.bgSub};

  ${media.mobile} {
    position: fixed;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    bottom: 0;
    background-color: ${COLOR.bg};
    border-top: 1px solid ${COLOR.bgSub};
    z-index: 100;

    ${NavItem} {
      flex-direction: column;
    }
  }
`;

function Nav() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        return <IoHomeSharp />;
      case 'podoal':
        return <LuGrape />;
      case 'tracker':
        return <IoApps />;
      case 'setting':
        return <LuSettings />;
      default:
        return <></>;
    }
  };
  return (
    <NAV>
      {navList.map((item, i) => {
        return (
          <NavItem key={i} to={item.nav}>
            <Icon>{getIcon(item.name.toLocaleLowerCase())}</Icon>
            <Name>{item.name}</Name>
          </NavItem>
        );
      })}
    </NAV>
  );
}

export default Nav;
