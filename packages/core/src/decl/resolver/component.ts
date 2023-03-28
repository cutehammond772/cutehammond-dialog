import { DialogComponentProps } from "$";
import { CustomResolver } from "$resolver/common";

export interface DialogResolverProps {
  resolvers?: Array<CustomResolver>;
}

export interface DialogResolverComponentProps extends DialogComponentProps, DialogResolverProps {}
