import { create } from "zustand";

type StateProps = {
  objForm: { [key: string]: string };
  setObjForm: (parameter: { [key: string]: string }) => void;
};

export const useObjFormStore = create<StateProps>((set) => ({
  objForm: {},
  setObjForm: (objForm) => set(() => ({ objForm })),
}));
