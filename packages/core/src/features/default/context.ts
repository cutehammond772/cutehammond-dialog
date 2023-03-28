import React from "react";
import { DefaultResolverContext } from "$features/default";
import { createResolverErrorMessage } from "@/utils/resolver";

const message = createResolverErrorMessage("DefaultResolver");

const OUT_OF_CONTEXT: DefaultResolverContext = {
  remove() {
    throw new Error(message("remove"));
  },
};

const Context = React.createContext<DefaultResolverContext>(OUT_OF_CONTEXT);

export default Context;
