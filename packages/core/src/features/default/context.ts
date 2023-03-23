import React from "react";
import { DefaultResolverContext } from "$resolver/features/default";
import { error } from "@/utils/resolver";

const message = error("DefaultResolver");

const OUT_OF_CONTEXT: DefaultResolverContext = {
  remove() {
    throw new Error(message("remove"));
  },
};

const Context = React.createContext<DefaultResolverContext>(OUT_OF_CONTEXT);

export default Context;
