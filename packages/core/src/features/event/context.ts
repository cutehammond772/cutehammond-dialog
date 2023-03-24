import React from "react";
import { EventResolverContext } from "$features/event/context";
import { createResolverErrorMessage } from "@/utils/resolver";

const message = createResolverErrorMessage("EventResolver");

const OUT_OF_CONTEXT: EventResolverContext = {
  publish() {
    throw new Error(message("publish"));
  },
  useDOMEvents() {
    throw new Error(message("useDOMEvents"));
  },
  useSubscriber() {
    throw new Error(message("useSubscriber"));
  },
};

const Context = React.createContext<EventResolverContext>(OUT_OF_CONTEXT);

export default Context;
