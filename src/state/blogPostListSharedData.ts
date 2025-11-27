import { createSignal } from "solid-js";

export type PostData = {
  id: string;
  body: string;
  data: {
    title: string;
    imageUrl?: string;
    pubDate: Date;
    editDate?: Date;
    tags: string[];
  }
}

export const query = createSignal(``);
export const sortMode = createSignal<`relevance`|`newFirst`|`oldFirst`>(`relevance`);
export const viewMode = createSignal<`grid`|`list`|`dash`>(`grid`);