import { API } from '../../types';

type Data = {
  hour12: boolean;
  mode: 'analogue' | 'digital';
  showDate: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  timeZone?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  mode: 'digital',
  hour12: false,
  showDate: false,
  showMinutes: true,
  showSeconds: false,
};
