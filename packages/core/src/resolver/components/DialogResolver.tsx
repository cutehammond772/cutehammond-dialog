import React, { useCallback, useMemo } from "react";
import { DialogKey } from "$";

import Context from "@/resolver/context";
import { useDialogProvider } from "@/provider/hooks";

/**
 * 특정 Dialog에서,
 *
 * 1. 리렌더링이 필요한 연산은 이 컴포넌트에서 수행됩니다.
 * 2. 고유의 Context를 제공합니다.
 */
const DialogResolver = ({ key, children }: React.PropsWithChildren<{ key: DialogKey }>) => {
  const { remove: removeWithKey } = useDialogProvider();

  // Dialog를 삭제합니다.
  const remove = useCallback(() => removeWithKey(key), [key, removeWithKey]);

  // 불필요한 렌더링을 막는다.
  const provider = useMemo(() => ({ remove }), [remove]);

  return <Context.Provider value={provider}>{children}</Context.Provider>;
};

export default DialogResolver;
