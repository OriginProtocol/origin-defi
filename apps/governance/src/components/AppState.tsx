import { createContext, useReducer } from 'react';

import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import type { ReactNode } from 'react';

interface Definitions {
  set<TPath extends string, TValue extends GetFieldType<IAppState, TPath>>(
    object: Record<TPath, TValue>,
  ): void;
  set<TPath extends string, TValue extends GetFieldType<IAppState, TPath>>(
    path: TPath,
    value?: TValue,
  ): void;
}

export type SetState = Definitions['set'];

export interface Toast {
  id: string;
  title: string;
  text: string;
  icon: string;
  type: string;
}

export interface Lockup {
  id: number;
  tokens: number;
  endsAt: number;
  votingPower: number;
}

export interface IAppState {
  connected: boolean;
  stakeModal: boolean;
  extendStakeModal: number | null;
  lockups: Lockup[];
  toasts: Toast[];
  toast?: {
    title: string;
    text: string;
    icon: string;
  };
  walletBalance: number;
  rewardsToCollect: number;
  devControls: boolean;
  waitForTx: boolean;
}

export const initialState: IAppState = {
  connected: false,
  lockups: [],
  toasts: [],
  stakeModal: false,
  extendStakeModal: null,
  walletBalance: 0,
  rewardsToCollect: 0,
  devControls: false,
  waitForTx: false,
};

interface StateContextProps {
  state: IAppState;
  setState: SetState;
}

export const StateContext = createContext<StateContextProps>({
  state: initialState as unknown as IAppState,
  setState: () => {},
});

function stateReducer(state: IAppState, action: Record<string, object>) {
  const newState = cloneDeep(state);
  Object.keys(action).forEach((path) => {
    const value = action[path];
    if (path === 'toast') {
      const toast = { ...value, id: Date.now() };
      set(newState, 'toasts', [...newState.toasts, toast]);
    } else {
      set(newState, path, value);
    }
  });
  return newState;
}

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, setState: setState as SetState }}>
      {children}
    </StateContext.Provider>
  );
};

/**
 * Modified from lodash types.
 */

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? 'length' extends keyof T
    ? number extends T['length']
      ? number extends keyof T
        ? T[number]
        : undefined
      : undefined
    : undefined
  : undefined;

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof Exclude<T, undefined>
    ?
        | FieldWithPossiblyUndefined<Exclude<T, undefined>[Left], Right>
        | Extract<T, undefined>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<
          IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
    : undefined
  : IndexedFieldWithPossiblyUndefined<T, P>;
