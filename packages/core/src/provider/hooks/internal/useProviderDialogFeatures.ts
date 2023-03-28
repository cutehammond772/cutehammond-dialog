import React, { useCallback } from "react";

import { Dialog, DialogKey } from "$common";
import useProviderContainerFeatures from "@/provider/hooks/internal/useProviderContainerFeatures";

const useProviderDialogFeatures = () => {
  const { register, has, get } = useProviderContainerFeatures<React.MemoExoticComponent<Dialog>>();

  const registerDialog = useCallback(
    (key: DialogKey, dialog: Dialog) => {
      // Dialog는 메모이제이션 처리되어 등록된다.
      register(key, React.memo(dialog));
    },
    [register]
  );

  return { registerDialog, hasDialog: has, getDialog: get };
};

export default useProviderDialogFeatures;
