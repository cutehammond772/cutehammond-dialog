import { Patch } from "$features/patch/common";
import { generatePatchID } from "@/utils/id";

const PROPERTIES: (keyof Patch)[] = ["id", "onInit", "onRequest", "onResolve", "onCleanUp"];

export const createPatchBuilder = <S extends object, R extends object>() => {
  const result: Partial<Patch<S, R>> = { id: generatePatchID() };

  const onInit = (fn: Patch<S, R>["onInit"]) => {
    result.onInit = fn;
  };

  const onRequest = (fn: Patch<S, R>["onRequest"]) => {
    result.onRequest = fn;
  };

  const onResolve = (fn: Patch<S, R>["onResolve"]) => {
    result.onResolve = fn;
  };

  const onCleanUp = (fn: Patch<S, R>["onCleanUp"]) => {
    result.onCleanUp = fn;
  };

  return {
    onInit,
    onRequest,
    onResolve,
    onCleanUp,

    get Patch(): Patch<S, R> {
      if (PROPERTIES.some((key) => !(key in result))) {
        throw new Error("모든 Patch 메서드가 초기화되어야 합니다.");
      }

      return result as Patch<S, R>;
    },
  };
};
