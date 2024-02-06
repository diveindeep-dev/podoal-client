import { ChangeEvent, FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import { AxiosError } from 'axios';
import { addPodoApi } from '../../features/podo/api';
import { IoIosPricetags, IoMdTrophy } from 'react-icons/io';
import { toast } from '../toast';
import Picker from '../picker';
import Icon from '../Icon';
import styled from 'styled-components';
import { ButtonStyle, ContentContainer, flexGlow } from '../../styles/Common';
import { COLOR } from '../../styles/Variables';

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

const LabelContainer = styled.div`
  ${flexGlow}
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Div = styled.div`
  ${ContentContainer}

  form {
    position: relative;
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
  icon: '',
  title: '',
  reward: '',
  tags: [],
};

function NewPodo() {
  const { values, handleChange, resetValues, setValues } = useForm({
    initialValues,
  });
  const [tagString, setTagString] = useState<string>('');
  const [isOpenPicker, setIsOpenPicker] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');

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
    if (!values.title) return;

    const newPodo: PodoForm = { ...values, icon };
    try {
      const response = await addPodoApi(newPodo);
      if (response) {
        if (response.status === 201) {
          resetValues();
          setTagString('');
          setIcon('');
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
          <div onClick={() => setIsOpenPicker(true)}>
            <Icon name={icon} isHover={true} />
          </div>
          <LabelContainer>
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
          </LabelContainer>
        </Wrapper>
        {isOpenPicker && (
          <Picker
            tabs={['Emoji', 'Icon']}
            handleClose={setIsOpenPicker}
            handleSetIcon={setIcon}
          />
        )}
        <button type="submit" disabled={values.title.length === 0}>
          등록
        </button>
      </form>
    </Div>
  );
}

export default NewPodo;
