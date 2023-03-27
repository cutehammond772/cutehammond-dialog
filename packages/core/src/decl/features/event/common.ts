export type DialogEventID = `event::${string}`;
export type DialogEventSubscriberID = `event_subscriber::${string}`;

export type DOMEvent = keyof GlobalEventHandlersEventMap;
export type DOMEventPayload<T extends DOMEvent> = GlobalEventHandlersEventMap[T];

export type DialogEventType = DialogEventID | DOMEvent;

// Note: DOMEvent에 별도의 Payload를 주입 시 오류가 발생한다.
export interface DialogEvent<T> {
  type: DialogEventType;
  payload: T;
}
