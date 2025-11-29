import { createSignal } from "solid-js";

export const searchState = createSignal<boolean>(false);
export const searchDelayActive = createSignal<boolean>(false);
export const query = createSignal<string>(``);
export const sortMode = createSignal<`relevance`|`newFirst`|`oldFirst`>(`relevance`);
export const viewMode = createSignal<`grid`|`list`|`dash`>(`list`);