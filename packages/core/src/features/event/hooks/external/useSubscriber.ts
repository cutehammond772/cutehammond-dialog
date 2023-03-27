import { useEffect } from "react";

import { DialogEvent } from "$features/event/common";
import useEventResolver from "@/features/event/hooks/external/useEventResolver";

const useSubscriber = <E extends DialogEvent<E["payload"]>>(
  event: E["type"],
  callback: (payload: E["payload"]) => void,
  duplicate?: boolean
) => {
  const { subscribe, unsubscribe } = useEventResolver();

  useEffect(() => {
    // 렌더링 이후 특정 Event를 구독하면서 ID를 저장한다.
    const subscriberID = subscribe<E>(event, callback, duplicate);

    // Unmount 또는 리렌더링 전에 구독을 해제한다.
    return () => unsubscribe<E>(subscriberID);
  }, [unsubscribe, subscribe, event, callback, duplicate]);
};

export default useSubscriber;
