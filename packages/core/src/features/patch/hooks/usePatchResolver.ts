import { useContext } from "react";

import { PatchResolverContext } from "$features/patch/context";
import Context from "@/features/patch/context";

const usePatchResolver = () => useContext<PatchResolverContext>(Context);

export default usePatchResolver;
