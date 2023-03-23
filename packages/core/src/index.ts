/* provider */
export { default as DialogProvider } from "@/provider/components/DialogProvider";
export { default as DialogArea } from "@/provider/components/DialogArea";

/* resolver */
export { default as DialogResolver } from "@/resolver/components/DialogResolver";
export { useDefaultResolver } from "@/features/default/hooks";

/* resolver utils */
export * from "@/utils/resolver";

/* type declarations */
export type { DialogID, DialogKey, Dialog } from "$";
