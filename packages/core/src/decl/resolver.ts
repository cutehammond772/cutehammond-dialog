import { DialogComponentProps } from "decl";

export type ResolverID = `resolver::${string}`;

export type CustomResolverComponent = (props: DialogComponentProps) => JSX.Element;

export interface CustomResolver {
  id: ResolverID;
  component: CustomResolverComponent;
}

export interface DialogResolverProps {
  resolvers?: Array<CustomResolver>;
}

export interface DialogResolverComponentProps extends DialogComponentProps, DialogResolverProps {}
