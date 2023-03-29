import * as React from "react";
import { DialogProviderContext } from "decl-context/provider";

const errorMessage = (method: string) =>
  `DialogProvider 외부에서는 ${method}()를 사용할 수 없습니다.`;

const OUT_OF_CONTEXT: DialogProviderContext = {
  add() {
    throw new Error(errorMessage("add"));
  },
  ref() {
    throw new Error(errorMessage("ref"));
  },
  remove() {
    throw new Error(errorMessage("remove"));
  },
};

const Context = React.createContext<DialogProviderContext>(OUT_OF_CONTEXT);

export default Context;
