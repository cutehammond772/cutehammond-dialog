import { useContainer } from "@/provider/hooks";

const useRefs = () => {
  const { register, has, get } = useContainer<HTMLDivElement>();

  // getRef의 경우 첫 렌더링 이전에 호출할 시 예외가 발생한다.
  return { registerRef: register, hasRef: has, getRef: get };
};

export default useRefs;
