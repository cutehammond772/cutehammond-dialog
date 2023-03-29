import { useCallback, useEffect, useRef, useState } from "react";

import { Dialog, DialogID } from "decl";
import { useDialogProvider } from "@/provider/hooks";

const useDialog = <T extends object>(dialog: Dialog<T>) => {
  const { add, removeWithID } = useDialogProvider();
  const [state] = useState<Dialog<T>>(dialog);
  const id = useRef<DialogID>();

  const create = useCallback(() => {
    if (id.current) {
      throw new Error(
        "이미 생성된 Dialog가 존재합니다. 동일한 Dialog를 여러 개 생성하려면 그만큼 Hook을 추가하세요."
      );
    }

    id.current = add(dialog);
  }, [add, dialog]);

  const remove = useCallback(() => {
    if (!id.current) {
      throw new Error("생성된 Dialog가 존재하지 않습니다.");
    }

    removeWithID(id.current);
    id.current = undefined;
  }, [removeWithID]);

  useEffect(() => {
    if (state !== dialog) {
      throw new Error("useDialog()의 매개변수는 바꿀 수 없습니다.");
    }
  }, [dialog, state]);

  return { create, remove };
};

export default useDialog;
