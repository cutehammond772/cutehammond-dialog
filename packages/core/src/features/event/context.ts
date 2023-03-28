import React from "react";
import { EventResolverContext } from "$features/event/context";
import { createResolverErrorMessage } from "@/utils/resolver";

const message = createResolverErrorMessage("EventResolver");

const OUT_OF_CONTEXT: EventResolverContext = {
  publish() {
    throw new Error(message("publish"));
  },
  attachDOMEvents() {
    throw new Error(message("attachDOMEvents"));
  },
  detachDOMEvents() {
    throw new Error(message("detachDOMEvents"));
  },
  subscribe() {
    throw new Error(message("subscribe"));
  },
  unsubscribe() {
    throw new Error(message("unsubscribe"));
  },
  unsubscribeAll() {
    throw new Error(message("unsubscribeAll"));
  },
};

const Context = React.createContext<EventResolverContext>(OUT_OF_CONTEXT);

export default Context;
