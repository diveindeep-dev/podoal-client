import { ChangeEvent, FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import { AxiosError } from 'axios';
import { addPodoApi } from '../../features/podo/api';
import { LuGrape } from 'react-icons/lu';
import { IoIosPricetags, IoMdTrophy } from 'react-icons/io';
import { toast } from '../toast';
import styled from 'styled-components';
import { ButtonStyle, ContentContainer, flexCenter } from '../../styles/Common';
import { COLOR } from '../../styles/Variables';

const Icon = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  margin-right: 15px;
  color: ${COLOR.bg};
  font-size: 1.7rem;
  background-color: ${COLOR.primary};
  border-radius: 50%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 0;
  color: ${COLOR.textLight};

  svg {
    margin-right: 10px;
    font-size: 1.5rem;
  }

  &:focus-within {
    color: ${COLOR.primary};
    font-weight: 500;
  }

  input {
    margin: 5px 0;
    padding: 5px 0;
    width: 100%;
    font-size: 0.9rem;
    border-bottom: 1px solid ${COLOR.textLight};

    &::placeholder {
      color: ${COLOR.textLight};
    }
    &:focus {
      border-bottom: 1px solid ${COLOR.primary};
    }
  }

  &.goal {
    margin: 0 0 10px 0;
    padding: 0;
    height: 50px;

    input {
      margin: 0;
      padding: 0;
      color: ${COLOR.primary};
      font-size: 1.8rem;
      font-weight: 700;
      border-bottom: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

const Div = styled.div`
  ${ContentContainer}

  form {
    display: flex;
    flex-direction: column;
    button {
      ${ButtonStyle}
      align-self: flex-end;
      width: 170px;
      padding: 15px;
      margin-top: 20px;
      color: ${COLOR.bg};
      background-color: ${COLOR.primary};
      font-weight: 500;
      border: 1px solid ${COLOR.primary};

      &:disabled {
        cursor: initial;
        color: ${COLOR.textLight};
        background-color: ${COLOR.bgSub};
        border: 1px solid ${COLOR.textLight};
      }
    }
  }
`;

const initialValues: PodoForm = {
  title: '',
  reward: '',
  tags: [],
};

function NewPodo() {
  const { values, handleChange, resetValues, setValues } = useForm({
    initialValues,
  });
  const [tagString, setTagString] = useState<string>('');

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTagString(value);
    const tagsText: string = value.replaceAll(' ', '').toUpperCase();
    const tagsArray = tagsText.split(',').filter((tag) => tag.length > 0);
    const tagSet = new Set(tagsArray);
    setValues({ ...values, tags: Array.from(tagSet) });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.title) {
      return setDisabled(false);
    }

    const newPodo: PodoForm = values;
    try {
      const response = await addPodoApi(newPodo);
      if (response) {
        if (response.status === 201) {
          resetValues();
          setTagString('');
          toast.success('등록되었습니다.');
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            '서버가 불안정합니다. 다시 시도해주세요.',
        );
      }
    }
  };

  return (
    <Div>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <label>
            <Icon>
              <LuGrape />
            </Icon>
          </label>
          <div>
            <Label className="goal">
              <input
                type="text"
                name="title"
                value={values.title}
                placeholder="목표: 어떤 포도입니까?"
                onChange={handleChange}
              />
            </Label>
            <Label>
              <IoMdTrophy />
              <input
                type="text"
                name="reward"
                value={values.reward}
                placeholder="마지막 포도알을 달성하면?"
                onChange={handleChange}
              />
            </Label>
            <Label>
              <IoIosPricetags />
              <input
                type="text"
                name="reward"
                value={tagString}
                placeholder="콤마(,)로 구분합니다."
                onChange={handleChangeTag}
              />
            </Label>
          </div>
        </Wrapper>
        <button type="submit" disabled={values.title.length === 0}>
          등록
        </button>
      </form>
    </Div>
  );
}

export default NewPodo;
