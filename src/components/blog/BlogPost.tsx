import { type Component, For, Show } from "solid-js";
import { type PostData } from "../../state/blogPostListSharedData";
import { getSimplifiedDate } from "../../util/dateTools";
import style from "./BlogPost.module.scss";

// TODO: fix image height on smaller displays

const BlogPost: Component<{ postData: PostData }> = (props) => {
  const post = props.postData;

  const pubDateISO = post.data.pubDate.toISOString();
  const pubDateSimple = getSimplifiedDate(post.data.pubDate);

  let editDateISO;
  let editDateSimple;

  if (post.data.editDate) {
    editDateISO = post.data.editDate.toISOString();
    editDateSimple = getSimplifiedDate(post.data.editDate);
  }

  console.debug(post.rendered);

  return (
    <div class={`${style.post} contentBox`}>
      <Show when={post.data.imageUrl != null}>
      	<div class={style.featuredImage}>
      		<img src={post.data.imageUrl} />
      	</div>
      </Show>
      <h1>{post.data.title}</h1>
      <div class={style.timestampBlock}>
      	<span><time datetime={pubDateISO}>{pubDateSimple}</time></span>
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