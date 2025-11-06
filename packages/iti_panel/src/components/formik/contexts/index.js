import { createContext } from "react";
export const FormikHelpersContext = createContext(null);
// export const AppStatusContext = createContext(null);



export const ContextMap = {
    default: createContext(null),
    Stage1Form: createContext(null),
    stageIAsmtAppDocUpload: createContext(null),
    stageIAsmtDetails: createContext(null),
    Stage2Form: createContext(null),
    stageIIAsmt: createContext(null),
};
