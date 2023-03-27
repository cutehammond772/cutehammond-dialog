import { DOMEvent, DialogEvent, DialogEventSubscriberID } from "$features/event/common";

export interface EventResolverContext {
  // DOMEvent를 이 Dialog에 매핑합니다.
  attachDOMEvents: (...events: Array<DOMEvent>) => void;

  // 기존 DOMEvent 매핑을 풉니다.
  detachDOMEvents: () => void;

  // Event를 구독합니다.
  // Note: { duplicate: true }일 경우 하나의 이벤트 타입에 대한 여러 구독자 생성을 허용합니다.
  subscribe: <E extends DialogEvent<E["payload"]>>(
    event: E["type"],
    callback: (payload: E["payload"]) => void,
    duplicate?: boolean
  ) => DialogEventSubscriberID;

  // Event 구독을 해제합니다.
  // Note: DialogEventID가 아닌 특정 이벤트 타입을 대입할 시 unsubscribeAll()을 수행합니다.
  unsubscribe: <E extends DialogEvent<E["payload"]>>(
    event: E["type"] | DialogEventSubscriberID
  ) => void;

  // 특정 이벤트에 대한 모든 구독자를 제거합니다.
  unsubscribeAll: <E extends DialogEvent<E["payload"]>>(event: E["type"]) => void;

  // CustomEvent를 Publish합니다.
  publish: <T>(event: DialogEvent<T>) => void;
}
