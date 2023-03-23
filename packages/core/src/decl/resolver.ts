export interface DefaultResolverContext {
  // Dialog 자신을 삭제합니다.
  remove: () => void;
}

export interface DialogResolverContext extends DefaultResolverContext {}
