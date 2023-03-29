import { useContext } from "react";

import { EventResolverContext } from "decl-context/event";
import Context from "@/features/event/context";

const useEventResolver = () => useContext<EventResolverContext>(Context);

export default useEventResolver;
