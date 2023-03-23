import { useContext } from "react";
import { DialogResolverContext } from "$resolver";
import Context from "@/resolver/context";

const useDialog = () => useContext<DialogResolverContext>(Context);

export default useDialog;
