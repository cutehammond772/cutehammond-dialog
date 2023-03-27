import { useCallback, useState } from "react";
import { PatchID } from "$features/patch/common";

const usePatchStoreFeatures = () => {
  const [stores, setStores] = useState<Record<PatchID, any>>({});

  const getStore = useCallback(
    <S extends object>(id: PatchID): S => {
      const store = stores[id];

      if (!store) {
        throw new Error(`[id: ${id}]에 대한 기존 store가 존재하지 않습니다.`);
      }

      return store;
    },
    [stores]
  );

  /**
   * Patch 내부에서 사용하는 Store의 값을 변경합니다.
   */
  const applyStore = useCallback(
    <S extends object>(id: PatchID, apply: ((store: S) => S) | S) => {
      let store;
      const reducedStore = typeof apply === "object" ? apply : apply((store = getStore<S>(id)));

      if (store === reducedStore) {
        throw new Error("applyStore()에서 apply 전과 후의 store는 다른 참조를 가져야 합니다.");
      }

      setStores((curStores) => ({ ...curStores, [id]: reducedStore }));
    },
    [getStore]
  );

  return { getStore, applyStore };
};

export default usePatchStoreFeatures;
