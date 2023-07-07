declare module 'react-native-stars' {
  import { ReactNode } from 'react';

  export interface StarsProps {
    half?: boolean;
    default?: number;
    update?: (val: number) => void;
    spacing?: number;
    count?: number;
    fullStar?: ReactNode;
    emptyStar?: ReactNode;
    halfStar?: ReactNode;
    disabled?: boolean;
  }

  export default function Stars(props: StarsProps): JSX.Element;
}