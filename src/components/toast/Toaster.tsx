import { Dispatch, SetStateAction } from 'react';
import { randomId } from '../../utils/random';

type SetToastList = Dispatch<SetStateAction<Map<any, any>>>;

class Toaster {
  setToastList: SetToastList = () => {
    return;
  };

  constructor(setState: SetToastList | null) {
    if (setState) {
      this.setToastList = setState;
    }
  }

  add = (item: ToastItem) => {
    this.setToastList((prev) => new Map(prev).set(item.id, item));
  };

  delete = (id: ToastItem['id']) => {
    this.setToastList((prev) => {
      const newItems = new Map(prev);
      newItems.delete(id);
      return newItems;
    });
  };

  success(message: ToastItem['message']): void {
    const id = randomId();
    const newItem: ToastItem = {
      type: 'success',
      id,
      message,
    };
    this.add(newItem);
  }
  error(message: ToastItem['message']): void {
    const id = randomId();
    const newItem: ToastItem = {
      type: 'error',
      id,
      message: message,
    };
    this.add(newItem);
  }
}

export default Toaster;
