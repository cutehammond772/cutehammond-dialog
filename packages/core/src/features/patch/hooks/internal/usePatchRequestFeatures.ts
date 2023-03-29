import { useCallback, useEffect, useRef, useState } from "react";
import { PatchRequest } from "decl-patch";
import { Fn } from "decl-context/patch";

type PatchRequestCallback = (patches: Array<PatchRequest>) => void;

const usePatchRequestFeatures = () => {
  const [requests, setRequests] = useState<Array<PatchRequest>>([]);
  const callback = useRef<PatchRequestCallback>(() => {});

  const useRequestEffect = useCallback((callbackFn: PatchRequestCallback) => {
    callback.current = callbackFn;
  }, []);

  const request: Fn<"request"> = useCallback(({ id, req }) => {
    setRequests((rqs) => rqs.concat({ id, req }));
  }, []);

  useEffect(() => {
    if (requests.length === 0) return;

    // 요청에 대한 정보를 콜백 함수로 넘겨 처리한다.
    callback.current(requests);

    // 수행된 요청 목록만 삭제한다.
    setRequests((rqs) => rqs.slice(requests.length));
  }, [requests]);

  return { request, useRequestEffect };
};

export default usePatchRequestFeatures;
