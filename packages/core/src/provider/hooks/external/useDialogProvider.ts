import { useContext } from "react";

import { DialogProviderContext } from "$provider";
import Context from "@/provider/context";

const useDialogProvider = () => useContext<DialogProviderContext>(Context);

export default useDialogProvider;
