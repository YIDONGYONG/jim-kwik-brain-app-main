import type { BrainType } from '../entities/codeData';

export type BrainTypeCode = BrainType;

export interface UserBrainState {
  currentType: BrainTypeCode | null;
  history: BrainTypeCode[];
}
