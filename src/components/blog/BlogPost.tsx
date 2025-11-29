import { type Component, For, Show } from "solid-js";
import { getSimplifiedDate } from "../../util/dateTools";
import { getPostUrl, type PostData } from "../../util/blogPostTools";
import style from "./BlogPost.module.scss";

// TODO: fix image height on smaller displays

const BlogPost: Component<{ postData: PostData }> = (props) => {
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
    <div class={`${style.post} contentBox`}>
      <Show when={post.data.imageUrl != null}>
      	<div class={style.featuredImage}>
      		<img src={post.data.imageUrl} />
      	</div>
      </Show>
      <a href={postUrl}>
        <h1>{post.data.title}</h1>
      </a>
      <div class={style.timestampBlock}>
        <a href={postUrl}>
          <time datetime={pubDateISO}>{pubDateSimple}</time>
        </a>
      	<Show when={post.data.editDate != null}>
      		<span class={style.updated}>
      			updated: <time datetime={editDateISO}>{editDateSimple}</time>
      		</span>
      	</Show>
      </div>
      <Show when={post.rendered != null}>
        <div 
          class={style.contentWrapper} 
          innerHTML={post.rendered.html}
        ></div>
      </Show>
      <div class={style.empty}>
    		<span>If you're seeing this, something has gone <strong>terribly wrong!</strong></span>
    		<span>...or this post just has no contents, for some reason.</span>
    	</div>
      <Show when={post.data.tags != null}>
      	<ul class={style.tags}>
          <For each={post.data.tags}>
            {(tag: string) => (
        			<li>#<span>{tag}</span></li>
        		)}
          </For>
      	</ul>
      </Show>
    </div>
  )
}

export default BlogPost;