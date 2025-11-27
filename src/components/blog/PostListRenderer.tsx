import { type Component, createEffect, createSignal, For, Show } from "solid-js";
import compare from 'string-comparison';
import { getUTCDateComponents } from '../../util/dateTools';
import GridArticle from "./GridArticle";
import { viewMode, sortMode, query, type PostData } from "../../state/blogPostListSharedData";
import style from "./PostListRenderer.module.scss";

// TODO: list and dashboard view modes

const PostList: Component<{ postData: any }> = (props) => {
  const [ getQuery, setQuery ] = query;
  const [ getSortMode, setSortMode ] = sortMode;
  const [ getViewMode, setViewMode ] = viewMode;
  const [ getPosts, setPosts ] = createSignal(props.postData);

  const exactrgx = /"(.+?)"/g

  createEffect(() => {
    let updatedPosts = [...props.postData] as PostData[];

    const query = getQuery();
    let comparisonData: any = {};

    if (query.length > 0) {
      // filter posts for exact string matching
      for (const match of [...query.matchAll(exactrgx)]) {
        const extractedString = match[1];

        updatedPosts = updatedPosts.filter((post) => {
          const targets = [
            post.body, 
            post.data.title, 
            ...post.data.tags
          ];

          for (const str of targets) {
            if (str.includes(extractedString)) return true;
          }
        });
      }

      // compile fuzzy match data
      for (const post of updatedPosts) {
        let match = 0;
        
        const targets = [
          post.body, 
          post.data.title
        ];

        for (const target of targets) {
          const result = compare.diceCoefficient.similarity(query, target);
          match += result;
        }

        comparisonData[post.id] = match;
      }

      // final filter to remove almost entirely irrelevant results
      updatedPosts = updatedPosts.filter((post) => {
        return (comparisonData[post.id] > 0.005) 
      });

      console.debug(comparisonData);
    }

    switch (getSortMode()) {
      case `relevance`:
        if (query.length > 0) {
          updatedPosts.sort((a, b) => {
            const aData = comparisonData[a.id];
            const bData = comparisonData[b.id];

            return bData - aData;
          });

          break;
        }

        // "relevance" defaults to "newest first" when there is no search query entered
      case `newFirst`:
        updatedPosts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
        break;
      case `oldFirst`:
        updatedPosts.sort((a, b) => a.data.pubDate.getTime() - b.data.pubDate.getTime());
        break;
    }

    setPosts(updatedPosts);
  })

  return (
    <main 
      classList={{ 
        [style.gridView]: getViewMode() == `grid`,
        [style.listView]: getViewMode() == `list`,
        [style.dashView]: getViewMode() == `dash`
      }}
      class="contentBox"
    >
      <Show when={getViewMode() == `grid`}>
        <For each={getPosts()}>
          {(post) => {
            const dc = getUTCDateComponents(post.data.pubDate);
  				  const datepath = `${dc.year}/${dc.month}/${dc.day}`;
            const postUrl = `/blog/${datepath}/${post.data.pubDate.getTime()}`;

            return (
              <GridArticle 
                postUrl={postUrl}
                postData={post}
              />
            )
          }}
        </For>
      </Show>
      <Show when={getPosts().length === 0}>
        <h2>no results found!</h2>
      </Show>
    </main>
  )
}

export default PostList;