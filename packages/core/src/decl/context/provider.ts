import { Dialog, DialogComponentProfile, DialogID, DialogKey } from "decl";

export type Fn<T extends keyof DialogProviderContext> = DialogProviderContext[T];

export interface DialogProviderContext {
  // Dialog를 추가합니다.
  add: <T extends object>(dialog: Dialog, profile?: DialogComponentProfile<T>) => DialogID;

  // Dialog를 즉시 삭제합니다.
  remove: (key: DialogKey) => void;

  // Dialog를 수정할 수 있는 Ref를 반환합니다.
  ref: (key: DialogKey) => HTMLDivElement;
}
