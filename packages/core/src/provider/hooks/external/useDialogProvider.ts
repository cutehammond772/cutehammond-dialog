import { useContext } from "react";

import { DialogProviderContext } from "decl-context/provider";
import Context from "@/provider/context";

const useDialogProvider = () => useContext<DialogProviderContext>(Context);

export default useDialogProvider;
