import type { Block } from './features/playground/types';

export type Pos = {
  x: number;
  y: number;
};

export type TargetBlockType = Block[] | Block | null;

export type SetTargetBlockType = React.Dispatch<React.SetStateAction<TargetBlockType>>;
