import React from "react";
import { DialogResolverComponentProps } from "$resolver/component";
import DefaultResolver from "@/features/default/resolver";

// Note: Memoization 관련 최적화 필요
const DialogResolver = ({ dialogKey, children, resolvers }: DialogResolverComponentProps) => {
  const dynamicResolvers = [DefaultResolver, ...(resolvers ?? [])];

  // DefaultResolver가 제일 뒤에 적용되도록 한다.
  return dynamicResolvers.reduceRight(
    (composites, { id, component: Resolver }) => (
      <Resolver dialogKey={dialogKey} key={id}>
        {composites}
      </Resolver>
    ),
    <>{children}</>
  );
};

export default DialogResolver;
