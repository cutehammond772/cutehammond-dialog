import { DialogID } from "decl";
import { ResolverID } from "decl-resolver";
import { PatchID } from "decl-patch";
import { DialogEventID, DialogEventSubscriberID } from "decl-event";

export const generateDialogID = (): DialogID => {
  const uuid = crypto.randomUUID();
  return `dialog::${uuid}`;
};

export const generateResolverID = (): ResolverID => {
  const uuid = crypto.randomUUID();
  return `resolver::${uuid}`;
};

export const generatePatchID = (): PatchID => {
  const uuid = crypto.randomUUID();
  return `patch::${uuid}`;
};

export const createEventID = (): DialogEventID => {
  const uuid = crypto.randomUUID();
  return `event::${uuid}`;
};

export const createEventSubscriberID = (): DialogEventSubscriberID => {
  const uuid = crypto.randomUUID();
  return `event_subscriber::${uuid}`;
};
