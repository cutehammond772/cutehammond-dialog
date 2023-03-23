import { DialogComponentProps } from "$";

export type ResolverID = `resolver::${string}`;

export type CustomResolverComponent = (props: DialogComponentProps) => JSX.Element;

export interface CustomResolver {
  id: ResolverID;
  component: CustomResolverComponent;
}
