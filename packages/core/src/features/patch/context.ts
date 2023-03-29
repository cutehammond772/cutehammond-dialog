import React from "react";
import { PatchResolverContext } from "decl-context/patch";
import { createResolverErrorMessage } from "@/lib/creator/resolver";

const message = createResolverErrorMessage("PatchResolver");

const OUT_OF_CONTEXT: PatchResolverContext = {
  has() {
    throw new Error(message("has"));
  },
  request() {
    throw new Error(message("request"));
  },
  reserve() {
    throw new Error(message("reserve"));
  },
};

const Context = React.createContext<PatchResolverContext>(OUT_OF_CONTEXT);

export default Context;
