import { useState } from 'react';
import {
  IoIosCheckmarkCircle,
  IoIosClose,
  IoIosCloseCircle,
  IoIosInformationCircle,
} from 'react-icons/io';
import styled from 'styled-components';
import { COLOR, FONT } from '../../styles/Variables';
import { flexCenter } from '../../styles/Common';

const ProgressBar = styled.div<ToastStyle>`
  position: absolute;
  width: 100%;
  height: 3px;
  left: 0;
  bottom: 0;
  background-color: ${({ type }) => COLOR.toast[type]};
  transform-origin: left;
  animation: progressBar 3s linear forwards;
  animation-play-state: ${({ $isPaused }) =>
    $isPaused ? 'paused' : 'running'};
  @keyframes progressBar {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
`;

const Icon = styled.div`
  ${flexCenter}
  font-size: 1.5rem;
`;

const Message = styled.div`
  padding: 0 10px;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Div = styled.div<ToastStyle>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 10px;
  margin: 5px 0;
  width: 60%;
  background-color: ${COLOR.bgSub};
  color: ${COLOR.text};
  font-family: ${FONT.body};
  font-size: 0.9rem;
  border-radius: 30px;
  border: 1px solid ${({ type }) => COLOR.toast[type]};
  overflow: hidden;
  ${Icon} {
    color: ${({ type }) => COLOR.toast[type]};
  }
`;

interface ToastStyle {
  type: Toast;
  $isPaused?: boolean;
}

interface ToastItemProps {
  item: ToastItem;
  handleDelete: () => void;
}

function ToastItem({ item, handleDelete }: ToastItemProps) {
  const { message, type } = item;
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoIosCheckmarkCircle />;
      case 'error':
        return <IoIosCloseCircle />;
      default:
        return <IoIosInformationCircle />;
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleExitingAnimationEnd = () => {
    handleDelete();
  };

  return (
    <Div
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Wrapper>
        <Icon>{getIcon()}</Icon>
        <Message>{message}</Message>
      </Wrapper>
      <Icon onClick={handleDelete}>
        <IoIosClose />
      </Icon>
      <ProgressBar
        type={type}
        onAnimationEnd={handleExitingAnimationEnd}
        $isPaused={isPaused}
      />
    </Div>
  );
}

export default ToastItem;