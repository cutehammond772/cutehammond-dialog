import { useCallback, useEffect, useRef, useState } from "react";
import { PatchID, Patch, PatchRegisterCallback } from "$features/patch/common";

const usePatchNodes = () => {
  const [nodes, setNodes] = useState<Array<Patch>>([]);
  const [reservations, setReservations] = useState<Array<Patch<any, any>>>([]);

  const ids = useRef<Set<PatchID>>(new Set());
  const callback = useRef<PatchRegisterCallback>(() => {});

  const hasPatch = useCallback((id: PatchID) => ids.current.has(id), []);

  /**
   * Patch를 예약합니다.
   */
  const reservePatch = useCallback(<S extends object, R extends object>(patch: Patch<S, R>) => {
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

  return { hasPatch, reservePatch, useRegisterEffect, nodes };
};

export default usePatchNodes;
