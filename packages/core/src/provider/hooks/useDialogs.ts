import { Dialog } from "$common";
import { useContainer } from "@/provider/hooks";

const useDialogs = () => {
  const { register, has, get } = useContainer<Dialog>();

  // 네이밍을 구체적으로 수정한다.
  return { registerDialog: register, hasDialog: has, getDialog: get };
};

export default useDialogs;
