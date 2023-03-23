import { DialogID } from "$";
import { ResolverID } from "$resolver/common";

export const generateDialogID = (): DialogID => {
  const uuid = crypto.randomUUID();
  return `dialog::${uuid}`;
};

export const generateResolverID = (): ResolverID => {
  const uuid = crypto.randomUUID();
  return `resolver::${uuid}`;
};
