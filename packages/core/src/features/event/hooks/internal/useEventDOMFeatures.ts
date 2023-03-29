import { useCallback, useMemo, useRef } from "react";

import { DialogKey } from "decl";
import { Fn } from "decl-context/event";
import { DOMEvent, DOMEventPayload } from "decl-event";
import { useDialogProvider } from "@/provider/hooks";

interface DOMEventCallbackInfo {
  type: DOMEvent;
  callback: (payload: DOMEventPayload<any>) => void;
}

const useEventDOMFeatures = (dialogKey: DialogKey, publish: Fn<"publish">) => {
  const { ref: getRef } = useDialogProvider();
  const ref = useMemo(() => getRef(dialogKey), [getRef, dialogKey]);
  const callbacks = useRef<Set<DOMEventCallbackInfo>>(new Set());

  const attachDOMEvents: Fn<"attachDOMEvents"> = useCallback(
    (...domEventTypes) => {
      if (callbacks.current.size) {
        throw new Error("기존에 존재하는 DOMEvent Listener를 제거해야 합니다.");
      }

      domEventTypes.forEach((type) => {
        const callback = (payload: any) => publish({ type, payload });
        callbacks.current.add({ type, callback });
        ref.addEventListener(type, callback);
      });
    },
    [ref, publish]
  );

  const detachDOMEvents: Fn<"detachDOMEvents"> = useCallback(() => {
    callbacks.current.forEach(({ type, callback }) => ref.removeEventListener(type, callback));
    callbacks.current.clear();
  }, [ref]);

  return { attachDOMEvents, detachDOMEvents };
};

export default useEventDOMFeatures;
