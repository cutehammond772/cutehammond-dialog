import { DOMEvent, DOMEventPayload } from "$features/event/common";

import useSubscriber from "@/features/event/hooks/external/useSubscriber";
import useDOMEventMapper from "@/features/event/hooks/external/useDOMEventMapper";

const useDOMEvent = <T extends DOMEvent>(
  event: T,
  callback: (payload: DOMEventPayload<T>) => void,
  duplicate?: boolean,
  autoMapping = true
) => {
  // 먼저 DOMEvent를 등록합니다.
  // { autoMapping: true }일 경우 DOMEvent는 자동으로 등록됩니다.
  useDOMEventMapper(autoMapping ? [event] : []);

  // 이 DOMEvent를 구독하는 Hook을 반환합니다.
  return useSubscriber<{ type: T; payload: DOMEventPayload<T> }>(event, callback, duplicate);
};

export default useDOMEvent;
