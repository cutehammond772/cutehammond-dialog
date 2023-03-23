import React from "react";
import { DialogResolverContext } from "$resolver";

const errorMessage = (method: string) =>
  `DialogResolver 외부에서는 ${method}()를 사용할 수 없습니다.`;

const OUT_OF_CONTEXT: DialogResolverContext = {
  remove() {
    throw new Error(errorMessage("remove"));
  },
};

const Context = React.createContext<DialogResolverContext>(OUT_OF_CONTEXT);

export default Context;
