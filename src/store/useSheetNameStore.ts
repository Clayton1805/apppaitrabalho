import { create } from "zustand";

type sheetName = "Visita" | "Pessoa";
type StateProps = {
  sheetName: sheetName;
  setSheetName: (parameter: sheetName) => void;
};

export const useSheetNameStore = create<StateProps>((set) => ({
  sheetName: "Visita",
  setSheetName: (sheetName: sheetName) => set(() => ({ sheetName })),
}));
