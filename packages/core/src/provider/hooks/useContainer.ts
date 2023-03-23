import { useCallback, useRef } from "react";

import { DialogKey } from "$common";

const useContainer = <T>() => {
  const container = useRef<WeakMap<DialogKey, T>>(new WeakMap());

  const register = useCallback((key: DialogKey, element: T) => {
    if (container.current.has(key)) {
      throw new Error("이미 존재하는 Key입니다.");
    }

    container.current.set(key, element);
  }, []);

  const has = useCallback((key: DialogKey) => container.current.has(key), []);

  const get = useCallback(
    (key: DialogKey) => {
      if (!has(key)) {
        throw new Error("존재하지 않는 Key입니다.");
      }

      return container.current.get(key)!;
    },
    [has]
  );

  return { register, has, get };
};

export default useContainer;
