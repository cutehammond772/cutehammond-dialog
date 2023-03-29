import React, { useCallback } from "react";

import { DialogComponent, DialogKey } from "decl";
import useProviderContainerFeatures from "@/provider/hooks/internal/useProviderContainerFeatures";

const useProviderDialogFeatures = () => {
  const { register, has, get } =
    useProviderContainerFeatures<React.MemoExoticComponent<DialogComponent>>();

  const registerDialog = useCallback(
    (key: DialogKey, dialog: DialogComponent) => {
      // Dialog는 메모이제이션 처리되어 등록된다.
      register(key, React.memo(dialog));
    },
    [register]
  );

  return { registerDialog, hasDialog: has, getDialog: get };
};

export default useProviderDialogFeatures;
