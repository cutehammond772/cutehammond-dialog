export type DialogEventID = `event::${string}`;
export type DialogEventSubscriberID = `event_subscriber::${string}`;

export type DOMEvent = keyof GlobalEventHandlersEventMap;
export type DOMEventPayload<T extends DOMEvent> = GlobalEventHandlersEventMap[T];

export type DialogEventType = DialogEventID | DOMEvent;

export type DialogEventSubscriber = (payload: any) => void;

export interface DialogEvent {
  type: DialogEventType;
  payload: any;
}
