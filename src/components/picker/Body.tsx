import { Dispatch, Fragment, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import { SIMPLE_ICONS, getSiIcon } from '../../utils/siIcons';
import { EMOJIS } from '../../utils/emoji';
import styled from 'styled-components';
import { COLOR, FONT } from '../../styles/Variables';
import { flexCenter } from '../../styles/Common';
import { media } from '../../styles/Mixin';

const Item = styled.div`
  ${flexCenter}
  padding: 4px;
  span {
    width: 24px;
    height: 24px;
    color: ${COLOR.textSub};
    font-size: 24px;
    font-family: ${FONT.emoji};
    line-height: 1em;
  }

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.textLight};
    border-radius: 5px;
  }
`;

const Sub = styled.div`
  padding: 12px 10px 5px;
  color: ${COLOR.textSub};
  font-size: 0.9rem;
  font-family: ${FONT.accent};
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1px;
  padding: 5px;

  ${media.mobileSub} {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const Div = styled.div`
  height: 420px;
  overflow-y: scroll;

  ${media.mobile} {
    height: 370px;
  }
`;

interface PickerBodyProps {
  tab: string;
  hanldeSetIcon: Dispatch<SetStateAction<string>>;
}

function PickerBody({ tab, hanldeSetIcon }: PickerBodyProps) {
  const getBodyByTab = () => {
    switch (tab) {
      case 'Emoji': {
        const subs = Object.keys(EMOJIS);
        return subs.map((sub: string, i: number) => {
          const data: Emoji[] = EMOJIS[sub as keyof typeof EMOJIS];
          const list = data.map((item, i) => {
            return (
              <Item key={i} onClick={() => hanldeSetIcon(item.emoji)}>
                <span>{item.emoji}</span>
              </Item>
            );
          });
          return (
            <Fragment key={i}>
              <Sub>{sub}</Sub>
              <List>{list}</List>
            </Fragment>
          );
        });
      }

      case 'Icon': {
        const subs = Object.keys(SIMPLE_ICONS);
        return subs.map((sub: string, i: number) => {
          const dataList = Object.keys(SIMPLE_ICONS[sub]);
          const list = dataList.map((name: string, i: number) => {
            const Icon: IconType = getSiIcon(name);
            return (
              <Item key={i} onClick={() => hanldeSetIcon(name)}>
                <span>
                  <Icon />
                </span>
              </Item>
            );
          });
          return (
            <Fragment key={i}>
              <Sub>{sub}</Sub>
              <List>{list}</List>
            </Fragment>
          );
        });
      }

      default:
        return <></>;
    }
  };

  return <Div>{getBodyByTab()}</Div>;
}

export default PickerBody;
