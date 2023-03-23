import { Patch, PatchID, PatchRequest } from "$features/patch/common";

export interface PatchResolverContext {
  // Patch 요청을 보냅니다. 등록되지 않은 Patch인 경우 무시됩니다.
  request: <R extends object>(request: PatchRequest<R>) => void;

  // Patch 등록을 예약합니다. 다음 렌더링 과정에서 등록이 수행됩니다.
  reserve: <S extends object, R extends object>(patch: Patch<S, R>) => void;

  // Patch가 예약 중이거나 이미 등록된 상태인지 확인합니다.
  has: (id: PatchID) => boolean;
}
