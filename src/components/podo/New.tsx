import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import { AxiosError } from 'axios';
import { addPodoApi } from '../../features/podo/api';
import { toast } from '../toast';

const initialValues: PodoForm = {
  title: '',
  reward: '',
  tags: [],
};

function NewPodo() {
  const { values, handleChange, resetValues, setValues } = useForm({
    initialValues,
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [tagString, setTagString] = useState<string>('');

  useEffect(() => {
    const { title } = values;
    title ? setDisabled(false) : setDisabled(true);
  }, [values]);

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
    <div>
      <h3>새로운 포도</h3>
      <form onSubmit={handleSubmit}>
        <label>
          목표
          <input
            type="text"
            name="title"
            value={values.title}
            placeholder="어떤 포도입니까?"
            onChange={handleChange}
          />
        </label>
        <label>
          보상
          <input
            type="text"
            name="reward"
            value={values.reward}
            placeholder="마지막 포도알을 달성하면?"
            onChange={handleChange}
          />
        </label>
        <label>
          태그
          <input
            type="text"
            name="reward"
            value={tagString}
            placeholder="콤마(,)로 구분합니다."
            onChange={handleChangeTag}
          />
        </label>
        <div>
          <button type="submit" disabled={disabled}>
            시작
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPodo;
