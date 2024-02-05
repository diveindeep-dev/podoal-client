import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getPodoListByPageApi } from '../features/podo/api';
import NewPodo from '../components/podo/New';
import PodoList from '../components/podo/List';
import { toast } from '../components/toast';

function Index() {
  const [list, setList] = useState<Podo[]>([]);
  const [page, setPage] = useState<number>(1);

  const getList = async () => {
    try {
      const response = await getPodoListByPageApi(page);
      if (response) {
        if (response.status === 200) {
          setList(response.data.podos);
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h1>Podoal</h1>
      <NewPodo />
      <PodoList list={list} />
    </div>
  );
}

export default Index;
