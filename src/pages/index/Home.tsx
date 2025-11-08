 
import { For, type Component, onMount, createSignal, useContext } from 'solid-js';
import { IconCheck } from '@tabler/icons-solidjs';
import { GalleryEntryData, LightBoxContext } from '../../components/Lightbox';
import metadata from './pageMetadata.json';

import styles from './Home.module.css';

const fetchAvatars = fetch(`/metadata/avatar.json`);

const Home: Component = () => {

  const socialLinks = [
    {
      title: `bluesky`,
      url: `https://bsky.app/profile/sharkaccino.com`,
      style: styles.bluesky
    },
    {
      title: `github`,
      url: `https://github.com/sharkaccino`,
      style: styles.github
    },
    {
      title: `discord`,
      text: `@sharkaccino`,
      style: styles.discord
    },
    {
      title: `steam`,
      url: `https://steamcommunity.com/id/sharkaccino/`,
      style: styles.steam
    },
    {
      title: `youtube`,
      url: `https://www.youtube.com/@sharkaccino`,
      style: styles.youtube
    },
    {
      title: `ko-fi`,
      url: `https://ko-fi.com/sharkaccino`,
      style: styles.kofi
    },
  ]

  onMount(() => {
    document.title = `${metadata.TITLE} - sharkaccino`;
  });

  return (
    <main>
      <div class={styles.notice}>
        <div>
          <h1>under<br/>construction</h1>
          <picture>
            <source srcset="/assets/doodle_dark.gif" media="(prefers-color-scheme: dark)" />
            <img src="/assets/doodle_light.gif" />
          </picture>
        </div>
        <h2>new website coming soon(-ish)</h2>
      </div>

      <div class={styles.linklist}>
        <For each={socialLinks}>
          {(item) => {
            if (item.text) {
              let labelWrapper!: HTMLDivElement;

              const copyButtonClickHandler = async (e: Event) => {
                await navigator.clipboard.writeText(item.text);

                // trigger copied animation
                labelWrapper.classList.remove(styles.copyAnimator);
                void labelWrapper.offsetWidth;
                labelWrapper.classList.add(styles.copyAnimator);
              }

              return (
                <a
                  class={item.style}
                  href="#"
                  onclick={copyButtonClickHandler}
                >
                  <span>{item.title}</span>
                  <div ref={labelWrapper}>
                    <span>{item.text}</span>
                    <span class={styles.textCopyNotification}> <IconCheck/> copied!</span>
                  </div>
                </a>
              )
            }

            return (
              <a
                class={item.style}
                href={item.url} 
                rel="external"
              >
                <span>{item.title}</span>
              </a>
            )
          }}
        </For>
      </div>
    </main>
  );
};

export default Home;