import { useCallback, useRef } from "react";

import {
  DialogEvent,
  DialogEventSubscriber,
  DialogEventSubscriberID,
  DialogEventType,
} from "decl-event";
import { Fn } from "decl-context/event";
import { createEventSubscriberID } from "@/utils/id";

const useEventSubscribeFeatures = () => {
  const subscribers = useRef<
    Map<DialogEventSubscriberID, [DialogEventType, DialogEventSubscriber]>
  >(new Map());
  const events = useRef<Map<DialogEventType, Array<DialogEventSubscriberID>>>(new Map());

  const subscribe: Fn<"subscribe"> = useCallback((event, subscriber, multiple) => {
    if (events.current.get(event)?.length && !multiple) {
      throw new Error("복수의 이벤트 구독자를 등록하려면 { multiple: true } 옵션을 설정하세요.");
    }

    const subscriberID = createEventSubscriberID();
    subscribers.current.set(subscriberID, [event, subscriber]);
    events.current.set(event, (events.current.get(event) ?? []).concat(subscriberID));
    return subscriberID;
  }, []);

  const unsubscribeAll: Fn<"unsubscribeAll"> = useCallback((event) => {
    if (!events.current.has(event)) {
      throw new Error(`현재 '${event}' 이벤트의 구독자가 존재하지 않습니다.`);
    }

    events.current.get(event)?.forEach(subscribers.current.delete);
    events.current.delete(event);
  }, []);

  const unsubscribe: Fn<"unsubscribe"> = useCallback((subscriberID) => {
    if (!subscribers.current.has(subscriberID)) {
      throw new Error("존재하지 않는 구독자입니다.");
    }

    const [event] = subscribers.current.get(subscriberID)!;
    events.current.set(
      event,
      (events.current.get(event) ?? []).filter((sid) => sid !== subscriberID)
    );
    subscribers.current.delete(subscriberID);
  }, []);

  const dispatchEvent = useCallback(({ type, payload }: DialogEvent) => {
    const subscriberIDs = events.current.get(type) ?? [];
    subscriberIDs.forEach((id) => {
      if (subscribers.current.has(id)) {
        const [, subscriber] = subscribers.current.get(id)!;
        // 구독자에게 이벤트를 전달합니다.
        subscriber(payload);
      }
    });
  }, []);

  return { subscribe, unsubscribe, unsubscribeAll, dispatchEvent };
};

export default useEventSubscribeFeatures;
