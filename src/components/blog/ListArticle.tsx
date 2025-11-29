import { type Component, Show } from "solid-js";
import { getSimplifiedDate } from "../../util/dateTools";
import { type PostData, getPostUrl } from "../../util/blogPostTools";
import style from "./ListArticle.module.scss";

const ListArticle: Component<{ postData: PostData }> = (props) => {
  const post = props.postData;
  const postUrl = getPostUrl(post);

  const pubDateISO = post.data.pubDate.toISOString();
  const pubDateSimple = getSimplifiedDate(post.data.pubDate);

  let editDateISO;
  let editDateSimple;

  if (post.data.editDate) {
    editDateISO = post.data.editDate.toISOString();
    editDateSimple = getSimplifiedDate(post.data.editDate);
  }

  return (
    <a class={`${style.listArticle} contentBox`} href={postUrl} title={post.data.title}>
      <article>
        <h2>{post.data.title}</h2>
        <span>posted <time datetime={pubDateISO}>{pubDateSimple}</time></span>
        <Show when={post.data.editDate != null}>
          <span class={style.updated}>
            updated <time datetime={editDateISO}>{editDateSimple}</time>
          </span>
        </Show>
        <Show when={post.data.imageUrl != null}>
          <img src={post.data.imageUrl} loading="lazy" />
        </Show>
      </article>
    </a>
  )
}

export default ListArticle;