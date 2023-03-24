import { DialogEvent, DialogEventID, DOMEvent } from "$features/event/common";

export interface EventResolverContext {
  // 이 Dialog가 어떤 DOM Event를 받을지 선택합니다.
  useDOMEvents: (...events: Array<DOMEvent>) => void;

  // DOM Event 또는 Custom Event를 구독합니다.
  useSubscriber: <E extends DialogEvent<P>, P>(
    event: E["type"],
    callback: (payload: E["payload"]) => void
  ) => void;

  // Custom Event를 Publish합니다.
  publish: (event: DialogEventID) => void;
}
