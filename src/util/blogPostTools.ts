import { getUTCDateComponents } from "./dateTools";

export type PostData = {
  id: string;
  body?: string;
  collection: `blog`;
  data: {
    title: string;
    imageUrl?: string;
    pubDate: Date;
    editDate?: Date;
    tags?: string[];
  };
  rendered?: any;
  filepath?: string;
}

export type PostDateInfo = {
  pubDate: {
    iso: string,
    simple: string,
  },
  editDate: {
    iso: string,
    simple: string
  } | null
}

export function getPostUrl(post: PostData): string {
  const pubDate: Date = post.data.pubDate;
	const dc = getUTCDateComponents(pubDate);
	const datepath = `${dc.year}/${dc.month}/${dc.day}`;
	return `/blog/${datepath}/${pubDate.getTime()}`;
}