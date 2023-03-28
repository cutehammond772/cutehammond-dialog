import { useCallback, useEffect, useRef, useState } from "react";
import { PatchRequest, PatchRequestCallback } from "$features/patch/common";

const usePatchRequestFeatures = () => {
  const [requests, setRequests] = useState<Array<PatchRequest<any>>>([]);

  const callback = useRef<PatchRequestCallback>(() => {});

  const useRequestEffect = useCallback((callbackFn: PatchRequestCallback) => {
    callback.current = callbackFn;
  }, []);

  /**
   * Patch 요청을 보냅니다.
   * 그 Patch가 등록되지 않은 경우  무시됩니다.
   */
  const requestPatch = useCallback(<R extends object>({ id, request }: PatchRequest<R>) => {
    setRequests((rqs) => rqs.concat({ id, request }));
  }, []);

  useEffect(() => {
    if (requests.length === 0) return;

    // 요청에 대한 정보를 콜백 함수로 넘겨 처리합니다.
    callback.current(requests);

    // 수행된 요청 목록만 삭제합니다.
    setRequests((rqs) => rqs.slice(requests.length));
  }, [requests]);

  return { requestPatch, useRequestEffect };
};

export default usePatchRequestFeatures;
