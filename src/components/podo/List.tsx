import { differenceInDays, formatDistanceToNow, lightFormat } from 'date-fns';
import { IoIosPricetags, IoMdTrophy } from 'react-icons/io';
import { BiSolidUser } from 'react-icons/bi';
import Icon from '../Icon';
import Tag from '../Tag';
import styled from 'styled-components';
import { ContentContainer, flexCenter } from '../../styles/Common';
import { COLOR, FONT } from '../../styles/Variables';
import { Link } from 'react-router-dom';

const CreatedDate = styled.div`
  padding-top: 3px;
  font-size: 0.8rem;
  font-family: ${FONT.accent};
  color: ${COLOR.textSub};
`;

const Progress = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${COLOR.textLight};
  font-family: ${FONT.body};
  font-weight: 700;
  font-size: 0.9rem;
  span {
    font-size: 2.5rem;
    line-height: 0.8em;
    color: ${COLOR.textSub};
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  color: ${COLOR.textLight};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DetailBody = styled.div`
  display: flex;
  align-items: center;
  z-index: 6;

  &.user {
    div {
      border-bottom: 1px solid ${COLOR.bg};
      span {
        padding: 0 3px;
        font-size: 0.8rem;
      }
      &:hover {
        cursor: pointer;
        border-bottom: 1px solid ${COLOR.textLight};
      }
    }
  }
`;

const DetailIcon = styled.span`
  ${flexCenter}
  width: 28px;
  height: 28px;
  margin-right: 7px;

  svg {
    font-size: 1.2rem;
    color: ${COLOR.primary};
  }
`;

const Detail = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 65px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${FONT.accent};
  color: ${COLOR.textSub};
`;

const Text = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${COLOR.text};
  font-size: 2rem;
  font-family: ${FONT.body};
  font-weight: 700;
  span {
    padding: 0 2px;
    color: ${COLOR.textSub};
    font-size: 0.9rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const LinkPodo = styled(Link)`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: #a8a7be1f;
  }
`;

const Item = styled.div`
  ${ContentContainer}
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR.bgSub};
`;

interface PodoListProps {
  list: Podo[];
}

function PodoList({ list }: PodoListProps) {
  const isPodo = list.length > 0;
  const items = list.map((item: Podo, i: number) => {
    const { icon, title, user, podoals, createdAt, tags, reward, _id } = item;
    const dateFormat =
      differenceInDays(new Date(), createdAt) < 30
        ? formatDistanceToNow(createdAt, {
            addSuffix: true,
          })
        : lightFormat(createdAt, 'yyyy. MM. dd');

    return (
      <Item key={i}>
        <LinkPodo to={`/podo/${_id}`} />
        <Title>
          <Icon name={icon || ''} />
          <Text>{title}</Text>
        </Title>
        <Details>
          <Left>
            <Detail>
              <DetailIcon>
                <BiSolidUser />
              </DetailIcon>
              <DetailBody
                as="a"
                href={`/user/${user.profileId}`}
                className="user"
              >
                <div>
                  {user.name}
                  <span>@{user.profileId}</span>
                </div>
              </DetailBody>
            </Detail>
            {reward && (
              <Detail>
                <DetailIcon>
                  <IoMdTrophy />
                </DetailIcon>
                <DetailBody>{reward}</DetailBody>
              </Detail>
            )}
            {tags.length > 0 && (
              <Detail>
                <DetailIcon>
                  <IoIosPricetags />
                </DetailIcon>
                <Tags>
                  {tags.map((tag, i) => {
                    return <Tag key={i} tag={tag} />;
                  })}
                </Tags>
              </Detail>
            )}
          </Left>
          <Right>
            <Progress>
              <span>{podoals?.length}</span>/ 30
            </Progress>
            <CreatedDate>{dateFormat}</CreatedDate>
          </Right>
        </Details>
      </Item>
    );
  });

  return <div>{isPodo ? items : <div>Podo가 없습니다.</div>}</div>;
}

export default PodoList;
