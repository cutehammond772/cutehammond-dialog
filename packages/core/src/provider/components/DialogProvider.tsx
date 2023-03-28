import React, { useCallback, useMemo } from "react";

import { DEFAULT_PROFILE, DialogKey, isCustomComponent } from "$common";
import {
  DialogProviderComponentProps,
  DialogProviderContext,
  ProviderAddFn,
  ProviderRemoveFn,
} from "$provider";

import DialogArea from "@/provider/components/DialogArea";
import Context from "@/provider/context";

import useProviderKeyFeatures from "@/provider/hooks/internal/useProviderKeyFeatures";
import useProviderDialogFeatures from "@/provider/hooks/internal/useProviderDialogFeatures";
import useProviderRefFeatures from "@/provider/hooks/internal/useProviderRefFeatures";

import DialogResolver from "@/resolver/components/DialogResolver";

const DialogProvider = ({ children, layout, resolvers }: DialogProviderComponentProps) => {
  const { keys, generateKey, removeKey } = useProviderKeyFeatures();
  const { registerRef, hasRef, getRef } = useProviderRefFeatures();
  const { registerDialog, getDialog } = useProviderDialogFeatures();

  const add: ProviderAddFn = useCallback(
    (dialog, profile) => {
      const key = generateKey(profile ?? DEFAULT_PROFILE);
      registerDialog(key, dialog);

      // 이후 이 ID를 활용할 수 있도록 해야 한다.
      return key.id;
    },
    [generateKey, registerDialog]
  );

  const remove: ProviderRemoveFn = useCallback((key) => removeKey(key), [removeKey]);

  // 첫 렌더링 시 Ref 객체를 가져와 등록합니다.
  const initRef = useCallback(
    (key: DialogKey) => (ref: HTMLDivElement | null) => {
      if (!ref) return null;
      if (hasRef(key)) return getRef(key);

      registerRef(key, ref);
      return ref;
    },
    [getRef, hasRef, registerRef]
  );

  // 불필요한 렌더링을 막는다.
  const provider = useMemo(
    (): DialogProviderContext => ({ add, remove, ref: getRef }),
    [add, remove, getRef]
  );

  return (
    <Context.Provider value={provider}>
      {children}
      <DialogArea layout={layout}>
        {keys.map((key) => {
          const Dialog = getDialog(key);
          const { id, profile } = key;

          // 공통으로 들어갈 내용이다.
          const content = (
            <DialogResolver dialogKey={key} resolvers={resolvers}>
              <Dialog />
            </DialogResolver>
          );

          if (isCustomComponent(profile)) {
            // 별도의 div 기반 컴포넌트를 사용하는 경우
            const { base: Base, props } = profile;

            return (
              <Base key={id} ref={initRef(key)} {...props}>
                {content}
              </Base>
            );
          } else {
            // div 컴포넌트에 class만 추가하는 경우
            const { className } = profile;

            return (
              <div key={id} ref={initRef(key)} className={className}>
                {content}
              </div>
            );
          }
        })}
      </DialogArea>
    </Context.Provider>
  );
};

export default DialogProvider;
