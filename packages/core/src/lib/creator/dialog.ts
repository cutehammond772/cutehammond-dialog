import { Dialog, DialogComponent, DialogComponentProfile } from "decl";

export const createDialog = <T extends object>(
  component: DialogComponent,
  profile?: DialogComponentProfile<T>
): Dialog<T> => ({
  component,
  profile,
});
