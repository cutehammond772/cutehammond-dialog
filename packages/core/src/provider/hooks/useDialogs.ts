import React, { useCallback } from "react";
import { Dialog, DialogKey } from "$common";
import { useContainer } from "@/provider/hooks";

const useDialogs = () => {
  const { register, has, get } = useContainer<React.MemoExoticComponent<Dialog>>();

  const registerDialog = useCallback(
    (key: DialogKey, dialog: Dialog) => {
      // Dialog는 메모이제이션 처리되어 등록된다.
      register(key, React.memo(dialog));
    },
    [register]
  );

  return { registerDialog, hasDialog: has, getDialog: get };
};

export default useDialogs;
