import { DOMEvent, DOMEventPayload } from "decl-event";

import useSubscriber from "@/features/event/hooks/external/useSubscriber";
import useDOMEventMapper from "@/features/event/hooks/external/useDOMEventMapper";

const useDOMEvent = <T extends DOMEvent>(
  eventType: T,
  subscriber: (payload: DOMEventPayload<T>) => void,
  multiple?: boolean,
  autoMapping = true
) => {
  // 먼저 DOMEvent를 등록합니다.
  // { autoMapping: true }일 경우 DOMEvent는 자동으로 등록됩니다.
  useDOMEventMapper(autoMapping ? [eventType] : []);

  // 이 DOMEvent를 구독하는 Hook을 반환합니다.
  return useSubscriber(eventType, subscriber, multiple);
};

export default useDOMEvent;
