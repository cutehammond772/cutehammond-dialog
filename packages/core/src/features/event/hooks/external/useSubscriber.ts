import { useEffect } from "react";

import { EventResolverContext } from "$features/event/context";
import useEventResolver from "@/features/event/hooks/external/useEventResolver";

type UseSubscriberFn = (...params: Parameters<EventResolverContext["subscribe"]>) => void;

const useSubscriber: UseSubscriberFn = (eventType, subscriber, multiple) => {
  const { subscribe, unsubscribe } = useEventResolver();

  useEffect(() => {
    // 렌더링 이후 특정 Event를 구독하면서 ID를 저장한다.
    const subscriberID = subscribe(eventType, subscriber, multiple);

    // Unmount 또는 리렌더링 전에 구독을 해제한다.
    return () => unsubscribe(subscriberID);
  }, [unsubscribe, subscribe, eventType, subscriber, multiple]);
};

export default useSubscriber;
