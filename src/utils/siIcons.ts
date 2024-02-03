import * as siIcons from 'react-icons/si';
import { IconType } from 'react-icons';

export const SIMPLE_ICONS: ReactIcons = { 'Simple Icons': siIcons };

export const getSiIcon = (name: string): IconType => {
  return siIcons[name as keyof typeof siIcons];
};
