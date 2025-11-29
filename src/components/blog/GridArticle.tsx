import { type Component, onMount, Show } from "solid-js";
import { getSimplifiedDate } from "../../util/dateTools";
import { type PostData } from "../../state/blogPostListSharedData";
import style from "./GridArticle.module.scss";

const GridArticle: Component<{ postUrl: string, postData: PostData }> = (props) => {
  const post = props.postData;

  let titleWrapper!: HTMLDivElement;
  let h2!: HTMLHeadingElement;

  const pubDateISO = post.data.pubDate.toISOString();
  const pubDateSimple = getSimplifiedDate(post.data.pubDate);

  let editDateISO;
  let editDateSimple;

  if (post.data.editDate) {
    editDateISO = post.data.editDate.toISOString();
    editDateSimple = getSimplifiedDate(post.data.editDate);
  }

  const checkOverflow = () => {
      const wrapperRect = titleWrapper.getBoundingClientRect();
      const h2Rect = h2.getBoundingClientRect();

      if (h2Rect.height > wrapperRect.height) {
        titleWrapper.classList.add(style.overflowing);
      } else {
        titleWrapper.classList.remove(style.overflowing);
      }
    }

  onMount(() => {
    const observer = new ResizeObserver(checkOverflow);

    observer.observe(titleWrapper);
    observer.observe(h2);

    checkOverflow();
  });

  return (
    <a class={style.gridArticle} href={props.postUrl} title={post.data.title}>
      <article>
        <Show when={post.data.imageUrl != null}>
          <div class={style.featuredImage}>
            <img class={style.hover} src={post.data.imageUrl} />
            <img src={post.data.imageUrl} />
          </div>
        </Show>
        <div ref={titleWrapper} class={style.titleWrapper}>
    			<h2 ref={h2}>{post.data.title}</h2>
    		</div>
        <span>posted <time datetime={pubDateISO}>{pubDateSimple}</time></span>
        <Show when={post.data.editDate != null}>
          <span class={style.updated}>
            updated <time datetime={editDateISO}>{editDateSimple}</time>
          </span>
        </Show>
      </article>
    </a>
  )
}

export default GridArticle;