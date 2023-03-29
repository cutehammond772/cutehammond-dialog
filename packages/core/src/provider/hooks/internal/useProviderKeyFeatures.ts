import { useCallback, useState } from "react";

import { DialogComponentProfile, DialogKey } from "decl";
import { generateDialogID } from "@/utils/id";

/**
 * DialogKey를 관리하는 Hook이다.
 * Key의 존재 여부에 따라, 이 Key를 이용하는 다른 영역에서 GC가 자동으로 일어난다.
 */
const useProviderKeyFeatures = () => {
  const [keys, setKeys] = useState<Array<DialogKey>>([]);

  const generateKey = useCallback((profile: DialogComponentProfile) => {
    const key = { id: generateDialogID(), profile };
    // Key를 보호한다.
    Object.freeze(key);

    setKeys((l) => l.concat(key));
    return key;
  }, []);

  const removeKey = useCallback((key: DialogKey) => {
    setKeys((l) => l.filter((k) => k !== key));
  }, []);

  return { generateKey, removeKey, keys };
};

export default useProviderKeyFeatures;
