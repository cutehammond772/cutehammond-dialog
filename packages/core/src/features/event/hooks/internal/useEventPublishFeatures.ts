import { useCallback, useEffect, useRef, useState } from "react";
import { Fn } from "decl-context/event";
import { DialogEvent } from "decl-event";

type EventEffectCallback = (events: Array<DialogEvent>) => void;

const useEventPublishFeatures = () => {
  const [events, setEvents] = useState<Array<DialogEvent>>([]);
  const effectCallback = useRef<EventEffectCallback>(() => {});

  const publish: Fn<"publish"> = useCallback(<E extends DialogEvent>(event: E) => {
    setEvents((evs) => evs.concat(event));
  }, []);

  const useEventEffect = useCallback((callback: EventEffectCallback) => {
    effectCallback.current = callback;
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    effectCallback.current([...events]);
    setEvents((evs) => evs.slice(events.length));
  }, [events]);

  return { publish, useEventEffect };
};

export default useEventPublishFeatures;
