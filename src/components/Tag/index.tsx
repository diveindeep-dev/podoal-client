import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flexCenter } from '../../styles/Common';
import { COLOR, FONT } from '../../styles/Variables';

const Div = styled(Link)`
  ${flexCenter}
  padding: 2px 8px;
  margin: 2px;
  color: ${COLOR.textSub};
  font-size: 0.8rem;
  font-family: ${FONT.accent};
  border: 1px solid ${COLOR.primary};
  border-radius: 30px;

  &:hover {
    cursor: pointer;
    color: ${COLOR.text};
    background-color: ${COLOR.bgSub};
  }
`;

interface TagProps {
  tag: Tag;
}

function Tag({ tag }: TagProps) {
  return <Div to={`/tags/${tag.text}`}># {tag.text}</Div>;
}

export default Tag;
