import { useEffect, useState } from "react";

import { DOMEvent } from "decl-event";
import useEventResolver from "@/features/event/hooks/external/useEventResolver";

const isDifferent = <T>(p: Array<T>, q: Array<T>) => {
  if (p.length !== q.length) return false;
  return !p.every((element) => q.includes(element));
};

// 이 Dialog가 어떤 DOMEvent를 받을지 선택한다.
const useDOMEventMapper = (events: Array<DOMEvent>) => {
  const [domEvents, setDOMEvents] = useState<Array<DOMEvent>>([]);
  const { attachDOMEvents, detachDOMEvents } = useEventResolver();

  useEffect(() => {
    if (isDifferent(events, domEvents)) setDOMEvents(events);
  }, [domEvents, events]);

  useEffect(() => {
    // DOMEvent를 Dialog Ref를 통해 매핑한다.
    attachDOMEvents(...domEvents);

    // Unmount 또는 DOMEvent의 구성이 바뀌기 전에 기존 DOMEvent의 매핑을 푼다.
    return detachDOMEvents;
  }, [domEvents, attachDOMEvents, detachDOMEvents]);
};

export default useDOMEventMapper;
