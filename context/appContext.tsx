import { createContext } from 'react';

type InitialState = {
  get: {
    generatedExec: string;
    generatedSitu1: string;
    generatedSitu2: string;
    generatedMark1: string;
    generatedMark2: string;
    generatedMark3: string;
    generatedMark4: string;
    generatedOp1: string;
    generatedOp2: string;
    generatedMang1: string;
    generatedMang2: string;
    generatedFin1: string;
    generatedRisk1: string;
    planPackage: string;
    starterPrice: string;
    proPrice: string;
  };
  set: {
    setGeneratedExec: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedSitu1: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedSitu2: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMark1: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMark2: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMark3: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMark4: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedOp1: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedOp2: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMang1: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedMang2: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedFin1: React.Dispatch<React.SetStateAction<string>>;
    setGeneratedRisk1: React.Dispatch<React.SetStateAction<string>>;
    setPlanPackage: React.Dispatch<React.SetStateAction<string>>;
    setStarterPrice: React.Dispatch<React.SetStateAction<string>>;
    setProPrice: React.Dispatch<React.SetStateAction<string>>;
  };
};

const initialState: InitialState = {
  get: {
    generatedExec: '',
    generatedSitu1: '',
    generatedSitu2: '',
    generatedMark1: '',
    generatedMark2: '',
    generatedMark3: '',
    generatedMark4: '',
    generatedOp1: '',
    generatedOp2: '',
    generatedMang1: '',
    generatedMang2: '',
    generatedFin1: '',
    generatedRisk1: '',
    planPackage: '',
    starterPrice: '',
    proPrice: '',
  },
  set: {
    setGeneratedExec: () => {},
    setGeneratedSitu1: () => {},
    setGeneratedSitu2: () => {},
    setGeneratedMark1: () => {},
    setGeneratedMark2: () => {},
    setGeneratedMark3: () => {},
    setGeneratedMark4: () => {},
    setGeneratedOp1: () => {},
    setGeneratedOp2: () => {},
    setGeneratedMang1: () => {},
    setGeneratedMang2: () => {},
    setGeneratedFin1: () => {},
    setGeneratedRisk1: () => {},
    setPlanPackage: () => {},
    setStarterPrice: () => {},
    setProPrice: () => {},
  },
};
export const AppContext = createContext(initialState);
export const AppDispatchContext = createContext(initialState);
