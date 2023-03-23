import { useContext } from "react";

import { DialogProviderContext } from "$provider";
import Context from "@/provider/context";

const useProvider = () => useContext<DialogProviderContext>(Context);

export default useProvider;
