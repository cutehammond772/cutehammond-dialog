import React, { useCallback, useMemo } from "react";
import { EventResolverContext } from "$features/event/context";

import { createResolver } from "@/utils/resolver";
import Context from "@/features/event/context";

type PublishFn = EventResolverContext["publish"];
type SubscribeFn = EventResolverContext["subscribe"];
type UnsubscribeFn = EventResolverContext["unsubscribe"];
type UnsubscribeAllFn = EventResolverContext["unsubscribeAll"];
type AttachDOMEventsFn = EventResolverContext["attachDOMEvents"];
type DetachDOMEventsFn = EventResolverContext["detachDOMEvents"];

const EventResolver = createResolver(({ dialogKey, children }) => {
  const subscribe: SubscribeFn = useCallback((event, callback, duplicate) => {}, []);
  const unsubscribe: UnsubscribeFn = useCallback((event) => {}, []);
  const unsubscribeAll: UnsubscribeAllFn = useCallback((event) => {}, []);
  const publish: PublishFn = useCallback((event) => {}, []);
  const attachDOMEvents: AttachDOMEventsFn = useCallback((events) => {}, []);
  const detachDOMEvents: DetachDOMEventsFn = useCallback(() => {}, []);

  const value = useMemo(
    (): EventResolverContext => ({
      subscribe,
      unsubscribe,
      unsubscribeAll,
      publish,
      attachDOMEvents,
      detachDOMEvents,
    }),
    [publish, attachDOMEvents, detachDOMEvents, subscribe, unsubscribe, unsubscribeAll]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export default EventResolver;
