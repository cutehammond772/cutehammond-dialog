import { useCallback, useEffect, useRef, useState } from "react";
import { PatchID, Patch } from "decl-patch";
import { Fn } from "decl-context/patch";

type PatchRegisterCallback = (patches: Array<Patch>) => void;

const usePatchNodeFeatures = () => {
  const [nodes, setNodes] = useState<Array<Patch>>([]);
  const [reservations, setReservations] = useState<Array<Patch<any, any>>>([]);

  const ids = useRef<Set<PatchID>>(new Set());
  const callback = useRef<PatchRegisterCallback>(() => {});

  const has: Fn<"has"> = useCallback((id) => ids.current.has(id), []);

  /**
   * Patch를 예약합니다.
   */
  const reserve: Fn<"reserve"> = useCallback((patch) => {
    if (ids.current.has(patch.id)) {
      throw new Error(`Patch '${patch.id}'는 이미 등록 또는 예약된 상태입니다.`);
    }

    setReservations((rvs) => rvs.concat(patch));

    // 예약된 Patch의 ID를 저장합니다.
    ids.current = ids.current.add(patch.id);
  }, []);

  const useRegisterEffect = useCallback((callbackFn: PatchRegisterCallback) => {
    callback.current = callbackFn;
  }, []);

  useEffect(() => {
    if (reservations.length === 0) return;

    // 예약된 Patch를 등록 요청합니다.
    setNodes((registeredNodes) => registeredNodes.concat(reservations));
    // 예약된 Patch에 대해 콜백을 호출합니다.
    callback.current(reservations);

    // 등록 요청된 Patch 목록만 삭제합니다.
    setReservations((rvs) => rvs.slice(reservations.length));
  }, [reservations]);

  return { has, reserve, useRegisterEffect, nodes };
};

export default usePatchNodeFeatures;
