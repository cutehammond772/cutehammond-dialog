import React from "react";
import { DialogResolverComponentProps } from "decl-resolver";

import PatchResolver from "@/features/patch/resolver";
import EventResolver from "@/features/event/resolver";

// Note: Resolver의 적용 대상에 대해 (1. 모든 Dialog 공통 / 2. 특정 Dialog만 제외 또는 해당) 생각해보기
// Note: Memoization 관련 최적화 필요
const DialogResolver = ({ dialogKey, children, resolvers }: DialogResolverComponentProps) => {
  const dynamicResolvers = [EventResolver, PatchResolver, ...(resolvers ?? [])];

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
