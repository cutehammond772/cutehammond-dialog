import { useContext } from "react";
import { DefaultResolverContext } from "$features/default";
import Context from "@/features/default/context";

const useDefaultResolver = () => useContext<DefaultResolverContext>(Context);

export default useDefaultResolver;