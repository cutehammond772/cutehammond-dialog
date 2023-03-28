/* provider */
export { default as DialogProvider } from "@/provider/components/DialogProvider";
export { default as DialogArea } from "@/provider/components/DialogArea";

/* resolver */
export { default as DialogResolver } from "@/resolver/components/DialogResolver";

/* default resolver */
export * from "@/features/default/hooks";

/* patch resolver */
export * from "@/features/patch/hooks";

/* event resolver */
export * from "@/features/event/hooks";

/* resolver utils */
export * from "@/utils/resolver";

/* patch utils */
export * from "@/utils/patch";

/* type declarations */
export type { DialogID, DialogKey, Dialog } from "$";
