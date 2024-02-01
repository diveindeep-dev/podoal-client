import { useEffect, useState } from 'react';
import Toaster from './Toaster';
import ToastItem from './Item';
import styled from 'styled-components';
import { flexCenter } from '../../styles/Common';

const Div = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

export let toast = new Toaster(null);

function Toast() {
  const [toastList, setToastList] = useState(new Map<string, ToastItem>());

  useEffect(() => {
    toast = new Toaster(setToastList);
  }, []);

  const list: [string, ToastItem][] = Array.from(toastList);

  return (
    <Div>
      {list.map((item) => {
        const id = item[0];
        const toastItem = item[1];
        const handleDelete = () => toast.delete(id);
        return (
          <ToastItem
            key={`toast-${id}`}
            item={toastItem}
            handleDelete={handleDelete}
          />
        );
      })}
    </Div>
  );
}

export default Toast;
