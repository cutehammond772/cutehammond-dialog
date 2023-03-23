import { Dialog, DialogComponentProfile, DialogID, DialogKey } from "$";
import { DialogResolverComponentProps } from "$resolver/component";

export type ProviderAddFn = <T extends object>(
  dialog: Dialog,
  profile?: DialogComponentProfile<T>
) => DialogID;

export type ProviderRemoveFn = (key: DialogKey) => void;

export type ProviderRefFn = (key: DialogKey) => HTMLDivElement;

export interface DialogProviderContext {
  add: ProviderAddFn;
  remove: ProviderRemoveFn;
  ref: ProviderRefFn;
}

export interface DialogAreaProps {
  layout: string;
}

export interface DialogProviderComponentProps
  extends React.PropsWithChildren,
    DialogAreaProps,
    DialogResolverComponentProps {}
