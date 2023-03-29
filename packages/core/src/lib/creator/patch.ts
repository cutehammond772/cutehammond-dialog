import { Patch } from "$features/patch/common";
import { generatePatchID } from "@/utils/id";

type PatchHandler<S extends object = object, R extends object = object> = keyof Omit<
  Patch<S, R>,
  "id"
>;

type HandlerSetters<S extends object = object, R extends object = object> = {
  [handler in PatchHandler<S, R>]: (fn: Patch<S, R>[handler]) => void;
};

const handlers: PatchHandler[] = ["onInit", "onRequest", "onResolve", "onCleanUp"];

export const createPatchBuilder = <S extends object, R extends object>() => {
  const result: Partial<Patch<S, R>> = { id: generatePatchID() };

  return {
    ...handlers.reduce(
      (methods, handler) => ({
        ...methods,
        [handler]: (fn: Patch<S, R>[typeof handler]) => {
          (result[handler] as Patch<S, R>[typeof handler]) = fn;
        },
      }),
      {} as HandlerSetters<S, R>
    ),

    get Patch() {
      if (handlers.some((key) => !(key in result))) {
        throw new Error("모든 Patch Handler가 초기화되어야 합니다.");
      }

      return result as Patch<S, R>;
    },
  };
};
