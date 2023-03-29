import { DialogResolverComponentProps } from "decl-resolver";

export interface DialogAreaProps {
  layout: string;
}

export interface DialogProviderComponentProps
  extends React.PropsWithChildren,
    DialogAreaProps,
    DialogResolverComponentProps {}