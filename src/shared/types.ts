import type { HttpMethod, Theme } from "./enums";

export type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];
export type ThemeType = (typeof Theme)[keyof typeof Theme];
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;