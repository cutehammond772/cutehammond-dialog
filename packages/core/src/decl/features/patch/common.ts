interface PatchRefProps {
  ref: HTMLDivElement;
}

interface PatchStoreProps<S extends object> {
  store: S;
}

interface PatchRequestProps<R extends object> {
  request: R;
}

export type PatchID = `patch::${string}`;

export interface InitProps extends PatchRefProps {}

export interface RequestProps<S extends object, R extends object>
  extends PatchStoreProps<S>,
    PatchRequestProps<R> {}

export interface ResolveProps<S extends object> extends PatchStoreProps<S>, PatchRefProps {}

export interface CleanUpProps<S extends object> extends PatchStoreProps<S>, PatchRefProps {}

export interface Patch<S extends object = object, R extends object = object> {
  id: PatchID;

  // Patch 초기화 시 PatchResolverContext에서 사용하는 Store를 초기화합니다.
  onInit: (props: InitProps) => S;
  // Patch 요청을 받아 Store 데이터를 수정합니다. 다음 렌더링에서 Resolve됩니다.
  onRequest: (props: RequestProps<S, R>) => S;
  // Store를 바탕으로(또는 독립적으로) Ref에 Patch를 적용합니다. (관리 또는 수정을 수행합니다.)
  onResolve: (props: ResolveProps<S>) => void;
  // Unmount 또는 다음 렌더링 전에 Ref를 정리합니다. (선택)
  onCleanUp: (props: CleanUpProps<S>) => void;
}

export interface PatchRequest<R extends object = object> {
  id: PatchID;
  request: R;
}

export type PatchRequestCallback = (patches: Array<PatchRequest>) => void;
export type PatchRegisterCallback = (patches: Array<Patch>) => void;
