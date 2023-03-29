import React, { useCallback, useEffect, useMemo } from "react";

import { PatchResolverContext } from "decl-context/patch";

import { createResolver } from "@/lib/creator/resolver";
import { useDialogProvider } from "@/provider/hooks";
import Context from "@/features/patch/context";

import usePatchNodeFeatures from "@/features/patch/hooks/internal/usePatchNodeFeatures";
import usePatchStoreFeatures from "@/features/patch/hooks/internal/usePatchStoreFeatures";
import usePatchRequestFeatures from "@/features/patch/hooks/internal/usePatchRequestFeatures";

const PatchResolver = createResolver(({ dialogKey, children }) => {
  const { ref: getRef } = useDialogProvider();
  const ref = useMemo(() => getRef(dialogKey), [getRef, dialogKey]);

  // Patch를 등록 및 관리합니다.
  const { nodes, useRegisterEffect, reserve, has } = usePatchNodeFeatures();

  // 각 Patch 내부에서 사용하는 Store를 관리합니다.
  const { getStore, applyStore } = usePatchStoreFeatures();

  // Patch 요청을 관리합니다.
  const { request, useRequestEffect } = usePatchRequestFeatures();

  // 예약된 Patch를 등록 요청 시 같이 onInit()를 수행하여 Store를 초기화합니다.
  useRegisterEffect(
    useCallback(
      (patches) => patches.forEach(({ id, onInit }) => applyStore(id, onInit({ ref }))),
      [ref, applyStore]
    )
  );

  // Patch 요청을 받아 onRequest()를 수행합니다.
  useRequestEffect(
    useCallback(
      (requests) => {
        nodes.forEach(({ id, onRequest }) =>
          applyStore(
            id,
            requests
              .filter((req) => req.id === id)
              .reduce(
                (acc, { req }) =>
                  (store) =>
                    onRequest({ request: req, store: acc(store) }),
                (store: object) => ({ ...store })
              )
          )
        );
      },
      [nodes, applyStore]
    )
  );

  // Mount 또는 Re-render 때 onResolve()를 수행합니다.
  useEffect(() => {
    nodes.forEach(({ id, onResolve }) => onResolve({ ref, store: getStore(id) }));
  }, [ref, nodes, getStore]);

  // Unmount 또는 Re-render 전에 onCleanUp()을 수행합니다.
  useEffect(
    () => () => {
      nodes.forEach(({ id, onCleanUp }) =>
        onCleanUp({
          ref,
          store: getStore(id),
        })
      );
    },
    [ref, nodes, getStore]
  );

  // 불필요한 렌더링을 막는다.
  const value = useMemo(
    (): PatchResolverContext => ({ request, reserve, has }),
    [request, reserve, has]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export default PatchResolver;
