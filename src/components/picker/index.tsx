import { Dispatch, SetStateAction, useState } from 'react';
import { GrPowerReset, GrClose } from 'react-icons/gr';
import PickerBody from './Body';
import styled from 'styled-components';
import { COLOR, FONT } from '../../styles/Variables';

const IconButton = styled.div`
  padding: 8px;
  margin: 3px;
  color: ${COLOR.textSub};
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    color: ${COLOR.text};
    background-color: ${COLOR.textLight};
    border-radius: 5px;
  }
`;

const Tab = styled.div`
  display: flex;
  margin: 0 5px;
  padding: 10px 10px 5px;
  color: ${COLOR.textSub};
  font-family: ${FONT.accent};
  font-weight: 300;
  border-bottom: 2px solid ${COLOR.bg};

  &:hover {
    cursor: pointer;
    color: ${COLOR.text};
    font-weight: 500;
  }

  &.active {
    color: ${COLOR.text};
    font-weight: 500;
    border-bottom: 2px solid ${COLOR.primary};
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.bgSub};
  div {
    display: flex;
    align-items: flex-end;
  }
`;

const Div = styled.div`
  position: absolute;
  max-width: 357px;
  top: 55px;
  background-color: ${COLOR.bg};
  border: 1px solid ${COLOR.bgSub};
  z-index: 9;
`;

interface PickerProps {
  tabs: string[];
  handleClose: Dispatch<SetStateAction<boolean>>;
  handleSetIcon: Dispatch<SetStateAction<string>>;
}

function Picker({ tabs, handleClose, handleSetIcon }: PickerProps) {
  const [tab, setTab] = useState('Emoji');
  const tabButtons = tabs.map((tabItem, i) => {
    return (
      <Tab
        key={i}
        onClick={() => setTab(tabItem)}
        className={tab === tabItem ? 'active' : ''}
      >
        {tabItem}
      </Tab>
    );
  });

  return (
    <Div>
      <Tabs>
        <div>{tabButtons}</div>
        <div>
          <IconButton onClick={() => handleSetIcon('')}>
            <GrPowerReset />
          </IconButton>
          <IconButton onClick={() => handleClose(false)}>
            <GrClose />
          </IconButton>
        </div>
      </Tabs>
      <PickerBody tab={tab} hanldeSetIcon={handleSetIcon} />
    </Div>
  );
}

export default Picker;
