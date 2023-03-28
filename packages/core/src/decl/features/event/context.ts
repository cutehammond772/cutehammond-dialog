import {
  DOMEvent,
  DialogEvent,
  DialogEventSubscriberID,
  DialogEventType,
  DialogEventSubscriber,
} from "$features/event/common";

export interface EventResolverContext {
  // DOMEvent를 이 Dialog에 매핑합니다.
  attachDOMEvents: (...domEventTypes: Array<DOMEvent>) => void;

  // 기존 DOMEvent 매핑을 풉니다.
  detachDOMEvents: () => void;

  // Event를 구독합니다.
  // Note: { multiple: true }일 경우 하나의 이벤트 타입에 대한 여러 구독자 생성을 허용합니다.
  subscribe: (
    eventType: DialogEventType,
    subscriber: DialogEventSubscriber,
    multiple?: boolean
  ) => DialogEventSubscriberID;

  // Event 구독자를 제거합니다.
  unsubscribe: (subscriberID: DialogEventSubscriberID) => void;

  // 특정 이벤트에 대한 모든 구독자를 제거합니다.
  unsubscribeAll: (eventType: DialogEventType) => void;

  // CustomEvent를 Publish합니다.
  publish: (event: DialogEvent) => void;
}
