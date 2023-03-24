import React, { useCallback, useMemo } from "react";
import { EventResolverContext } from "$features/event/context";

import { createResolver } from "@/utils/resolver";
import Context from "@/features/event/context";

type UseSubscriberFn = EventResolverContext["useSubscriber"];
type UseDOMEventsFn = EventResolverContext["useDOMEvents"];
type PublishFn = EventResolverContext["publish"];

const EventResolver = createResolver(({ dialogKey, children }) => {
  const useSubscriber: UseSubscriberFn = useCallback((event, callback) => {}, []);
  const publish: PublishFn = useCallback((event) => {}, []);
  const useDOMEvents: UseDOMEventsFn = useCallback((...events) => {}, []);

  const value = useMemo(
    (): EventResolverContext => ({ useSubscriber, useDOMEvents, publish }),
    [useSubscriber, useDOMEvents, publish]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export default EventResolver;
