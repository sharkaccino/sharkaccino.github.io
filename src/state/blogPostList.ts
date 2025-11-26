import { createSignal } from "solid-js";

export const query = createSignal(``);
export const exactMatch = createSignal(false);
export const sortMode = createSignal<`newFirst`|`oldFirst`>(`newFirst`);
export const viewMode = createSignal<`grid`|`list`|`dash`>(`grid`);
export const tagFilters = createSignal<string[]>([]);