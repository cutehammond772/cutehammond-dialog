import { useContext } from "react";

import { PatchResolverContext } from "decl-context/patch";
import Context from "@/features/patch/context";

const usePatchResolver = () => useContext<PatchResolverContext>(Context);

export default usePatchResolver;
