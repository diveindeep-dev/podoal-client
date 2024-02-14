import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getPodoByIdApi } from '../../features/podo/api';
import { arrangePodoal } from '../../utils/arrange';
import styled from 'styled-components';
import { flexCenter } from '../../styles/Common';
import { COLOR, FONT } from '../../styles/Variables';

const Podoal = styled.div`
  ${flexCenter}
  position: absolute;
  width: 100%;
  height: 100%;
  color: ${COLOR.textLight};
  background-color: ${COLOR.bg};
  font-family: ${FONT.accent};
  font-weight: 500;
  font-size: 1.5rem;
  border-radius: 50%;
  border: 2px solid ${COLOR.primary};

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.primary};
  }

  &.reward {
    font-size: 1.2rem;
  }
`;

const PodoalWrap = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
`;

interface PodoalProps {
  $row: number;
}

const Row = styled.div<PodoalProps>`
  display: flex;

  &:nth-child(${(props) => props.$row}) {
    ${PodoalWrap}:nth-child(n+1) {
      ${Podoal} {
        top: ${(props) => props.$row * -15}px;
      }
    }
  }
`;

const Podoals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Podo() {
  const { podoId } = useParams();
  const [podo, setPodo] = useState<Podo | null>(null);
  const podoalRows = [4, 5, 4, 5, 5, 4, 2];
  const podoalArrange = arrangePodoal(podoalRows);

  const getPodo = async (id: string) => {
    try {
      const response = await getPodoByIdApi(id);
      if (response) {
        if (response.status === 200) {
          setPodo(response.data.podo);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          error.response?.data.message ||
            '서버가 불안정합니다. 다시 시도해주세요.',
        );
      }
    }
  };

  useEffect(() => {
    if (podoId) {
      getPodo(podoId);
    }
  }, [podoId]);

  return (
    <div>
      {podo ? (
        <div>
          <div>{podo.title}</div>
          <div>{podo.createdAt}</div>
          <Podoals>
            {podoalArrange.map((arrange: number[], k) => {
              return (
                <Row key={`row-${k}`} $row={k + 1}>
                  {arrange.map((position, i) => {
                    return (
                      <Fragment key={`item-${i}`}>
                        <PodoalWrap>
                          <Podoal>{position}</Podoal>
                        </PodoalWrap>
                      </Fragment>
                    );
                  })}
                </Row>
              );
            })}
            <Row $row={podoalRows.length + 1}>
              <PodoalWrap>
                <Podoal className="reward">{podo.reward || '성공'}</Podoal>
              </PodoalWrap>
            </Row>
          </Podoals>
        </div>
      ) : (
        <div>존재하지 않는 포도입니다.</div>
      )}
    </div>
  );
}
export default Podo;
