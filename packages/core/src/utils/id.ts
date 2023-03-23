import { DialogID } from "$common";

export const generateDialogID = (): DialogID => {
  const uuid = crypto.randomUUID();
  return `dialog::${uuid}`;
};
