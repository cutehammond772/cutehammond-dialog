export type DialogEventID = `event::${string}`;
export type DOMEvent = keyof GlobalEventHandlersEventMap;

export type DialogEventType = DialogEventID | DOMEvent;

export interface DialogEvent<T = object> {
  type: DialogEventType;
  payload: T;
}
