import React, { useCallback, useMemo } from "react";
import { EventResolverContext } from "$features/event/context";

import { createResolver } from "@/utils/resolver";
import Context from "@/features/event/context";

import useEventSubscribeFeatures from "@/features/event/hooks/internal/useEventSubscribeFeatures";
import useEventPublishFeatures from "@/features/event/hooks/internal/useEventPublishFeatures";
import useEventDOMFeatures from "@/features/event/hooks/internal/useEventDOMFeatures";

const EventResolver = createResolver(({ dialogKey, children }) => {
  const { subscribe, unsubscribe, unsubscribeAll, dispatchEvent } = useEventSubscribeFeatures();
  const { publish, useEventEffect } = useEventPublishFeatures();
  const { attachDOMEvents, detachDOMEvents } = useEventDOMFeatures(dialogKey, publish);

  useEventEffect(
    useCallback(
      (events) => {
        events.forEach(dispatchEvent);
      },
      [dispatchEvent]
    )
  );

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
