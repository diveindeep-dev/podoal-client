import { LuGrape } from 'react-icons/lu';
import styled, { css } from 'styled-components';
import { getSiIcon } from '../../utils/siIcons';

import { COLOR, FONT } from '../../styles/Variables';
import { flexCenter } from '../../styles/Common';
import { upperCaseRegex } from '../../utils/regex';

interface HoverProps {
  $isHover: boolean;
}

const Div = styled.div<HoverProps>`
  ${flexCenter}
  width: 50px;
  height: 50px;
  margin-right: 15px;
  color: ${COLOR.bg};
  background-color: ${COLOR.primary};
  font-size: 25px;
  border-radius: 50%;

  &.emoji {
    padding-top: 3px;
    background-color: ${COLOR.bg};
    font-size: 46px;
    font-family: ${FONT.emoji};
  }

  ${({ $isHover }) =>
    $isHover &&
    css`
      &:hover {
        cursor: pointer;
        filter: grayscale(1);
      }
    `};
`;

interface IconsProps {
  name: string;
  isHover?: boolean;
}

function Icon({ name, isHover = false }: IconsProps) {
  const isUpperCase = upperCaseRegex.test(name.slice(0, 1));
  const typeClass = !name || isUpperCase ? '' : 'emoji';

  const getIcon = () => {
    if (!name) return <LuGrape />;
    if (isUpperCase) {
      const Icon = getSiIcon(name);
      return <Icon />;
    }
    return name;
  };

  return (
    <Div className={typeClass} $isHover={isHover}>
      {getIcon()}
    </Div>
  );
}

export default Icon;
