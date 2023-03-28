import { CustomResolver, CustomResolverComponent } from "$resolver/common";
import { generateResolverID } from "@/utils/id";

export const createResolverErrorMessage = (resolverName: string) => (methodName: string) =>
  `${resolverName} 외부에서는 ${methodName}()를 사용할 수 없습니다.`;

export const createResolver = (component: CustomResolverComponent): CustomResolver => ({
  id: generateResolverID(),
  component,
});
