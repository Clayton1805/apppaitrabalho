import { create } from "zustand";

type StateProps = {
  headers: { Visita: string[]; Pessoa: string[] };
  setHeaders: (parameter: { Visita: string[]; Pessoa: string[] }) => void;
};

export const useHeadersStore = create<StateProps>((set) => ({
  headers: { Visita: [], Pessoa: [] },
  setHeaders: (headers) => set(() => ({ headers })),
}));
