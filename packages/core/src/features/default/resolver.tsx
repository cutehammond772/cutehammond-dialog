import React, { useCallback, useMemo } from "react";

import { createResolver } from "@/utils/resolver";
import { useDialogProvider } from "@/provider/hooks";
import Context from "@/features/default/context";
import { DefaultResolverContext } from "$features/default";

const DefaultResolver = createResolver(({ dialogKey, children }) => {
  const { remove: removeWithKey } = useDialogProvider();

  // Dialog를 삭제한다.
  const remove = useCallback(() => removeWithKey(dialogKey), [dialogKey, removeWithKey]);

  // 불필요한 렌더링을 막는다.
  const value = useMemo((): DefaultResolverContext => ({ remove }), [remove]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export default DefaultResolver;
