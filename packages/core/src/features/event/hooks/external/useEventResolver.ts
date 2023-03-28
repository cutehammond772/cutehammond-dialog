import { useContext } from "react";

import { EventResolverContext } from "$features/event/context";
import Context from "@/features/event/context";

const useEventResolver = () => useContext<EventResolverContext>(Context);

export default useEventResolver;
