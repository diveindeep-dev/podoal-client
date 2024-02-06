import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getPodoListByPageApi } from '../features/podo/api';
import NewPodo from '../components/podo/New';
import PodoList from '../components/podo/List';
import { toast } from '../components/toast';

function Index() {
  const [list, setList] = useState<Podo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const getList = async () => {
    try {
      const response = await getPodoListByPageApi(page);
      if (response) {
        if (response.status === 200) {
          if (target && response.data.podos.length < 5) {
            setTarget(null);
          }
          setList((prev) => [...prev, ...response.data.podos]);
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

  const onIntersect: IntersectionObserverCallback = (entreis) => {
    entreis.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <div>
      <h1>Podoal</h1>
      <NewPodo />
      <PodoList list={list} />
      <div ref={setTarget}>You're up to date.</div>
    </div>
  );
}

export default Index;
