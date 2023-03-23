/* provider */
export { default as DialogProvider } from "@/provider/components/DialogProvider";
export { default as DialogArea } from "@/provider/components/DialogArea";

/* resolver */
export { useDialog } from "@/resolver/hooks";
export { default as DialogResolver } from "@/resolver/components/DialogResolver";

/* type declarations */
export type { DialogID, DialogKey, Dialog } from "$";
export type { DialogAreaProfile } from "$provider";
