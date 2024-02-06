import { useEffect, useState } from 'react';

const useInfiniteScroll = () => {
  const [page, setPage] = useState<number>(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

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

  return { page, setPage, target, setTarget };
};

export default useInfiniteScroll;
