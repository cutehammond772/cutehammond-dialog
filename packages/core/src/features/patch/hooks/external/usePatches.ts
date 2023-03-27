import { useEffect } from "react";

import { Patch } from "$features/patch/common";
import usePatchResolver from "@/features/patch/hooks/external/usePatchResolver";

const usePatches = (patches: Array<Patch>) => {
  const { has, reserve } = usePatchResolver();

  useEffect(() => {
    // 아직 등록되지 않거나 예약 상태가 아닌 Patch를 예약합니다.
    patches.filter(({ id }) => !has(id)).forEach(reserve);
  }, [has, reserve, patches]);
};

export default usePatches;
