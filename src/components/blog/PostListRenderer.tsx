import { type Component, createEffect, createSignal, For, Show } from "solid-js";
import compare from 'string-comparison';
import { getUTCDateComponents } from '../../util/dateTools';
import GridArticle from "./GridArticle";
import { viewMode, sortMode, query, type PostData } from "../../state/blogPostListSharedData";
import style from "./PostListRenderer.module.scss";
import { RandomStringinator } from "../../util/randomString";

// TODO: list and dashboard view modes

// TODO: move search/filter algorithm to it's own file

const PostList: Component<{ postData: any }> = (props) => {
  const [ getQuery, setQuery ] = query;
  const [ getSortMode, setSortMode ] = sortMode;
  const [ getViewMode, setViewMode ] = viewMode;
  const [ getPosts, setPosts ] = createSignal(props.postData);

  const exactrgx = /"(.+?)"/g

  const noResultStrings = [
    `no results found`,
    `behold, nothing`,
    `wow it's nothing`,
    `sadly, it's empty`,
    `i ate those posts, sorry`,
    `no posts to be found here`,
    `nothing but dust here`
  ];

  const stringinator = new RandomStringinator(noResultStrings);

  // TODO: support for keywords, i.e tag:<query>
  // exactrgx needs to be adjusted to compensate!!!
  const refreshResults = () => {
    let updatedPosts = [...props.postData] as PostData[];

    const query = getQuery();
    let comparisonData: any = {};

    if (query.length > 0) {
      const acquireTargets = (post: PostData) => {
        const output = [
          post.body, 
          post.data.title,
          post.data.pubDate.toUTCString()
        ];

        if (post.data.editDate) {
          output.push(post.data.editDate.toUTCString());
        }

        if (post.data.tags) {
          output.push(...post.data.tags);
        }

        return output;
      };

      // filter posts for exact string matching
      for (const match of [...query.matchAll(exactrgx)]) {
        const extractedString = match[1];

        updatedPosts = updatedPosts.filter((post) => {
          const targets = acquireTargets(post);

          for (const str of targets) {
            if (str.includes(extractedString)) return true;
          }
        });
      }

      // compile fuzzy match data
      for (const post of updatedPosts) {
        let match = 0;
        
        const targets = acquireTargets(post);

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
  }

  createEffect(() => {
    refreshResults();
    stringinator.refresh();
  });

  refreshResults();

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
        <h2>{stringinator.getCurrentString()}</h2>
      </Show>
    </main>
  )
}

export default PostList;