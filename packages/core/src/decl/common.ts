import React from "react";

type DialogBaseComponent<T extends object> = React.ComponentType<
  React.HTMLAttributes<HTMLDivElement> & React.ClassAttributes<HTMLDivElement> & Partial<T>
>;

export interface DialogWithCustomComponent<T extends object> {
  base: DialogBaseComponent<T>;
  props?: T;
}

export interface DialogWithClassName {
  className: string;
}

export type DialogComponentProfile<T extends object = object> =
  | DialogWithClassName
  | DialogWithCustomComponent<T>;

// Type Guard
export const isCustomComponent = <T extends object>(
  profile: DialogComponentProfile<T>
): profile is DialogWithCustomComponent<T> => "base" in profile;

// 기본 DialogComponentProfile
export const DEFAULT_PROFILE: DialogWithClassName = { className: "" } as const;

// 외부에서는 이 ID를 통해 Dialog를 관리합니다.
export type DialogID = `dialog::${string}`;

export interface DialogKey {
  id: DialogID;
  profile: DialogComponentProfile;
}

export type Dialog = () => JSX.Element;
