<script lang="ts">
  import type { PhotoInfo } from "./api/base";

  import { queryRandomPhotoThumbUrl, queryRandomPhoto } from "./api/picsum";
  import { queryBingPhoto } from "./api/bing";

  let {
    VITE_MY_NAME,
    VITE_MY_SITE,
    VITE_BEIAN_NO,
    VITE_BEIAN_SITE,
    VITE_APP_DEFAULT_PHOTO_PROVIDER,
  } = import.meta.env;

  VITE_MY_NAME = decodeURIComponent(VITE_MY_NAME || "");
  VITE_BEIAN_NO = decodeURIComponent(VITE_BEIAN_NO || "");

  // bing or random
  let photoProvider = VITE_APP_DEFAULT_PHOTO_PROVIDER;
  let photoThumbUrl: string = "";
  let photoInfo: PhotoInfo = null;

  photoProvider = ["bing", "random"].includes(photoProvider)
    ? photoProvider
    : "bing";

  function init() {
    switch (photoProvider) {
      case "bing":
        queryBingPhoto().then((info) => {
          photoInfo = info;
        });
        break;
      case "random":
        queryRandomPhotoThumbUrl()
          .then((photoUrl) => {
            photoThumbUrl = photoUrl;
            return queryRandomPhoto(photoUrl);
          })
          .then((info) => {
            photoInfo = info;
          });
        break;
    }
  }

  init();
</script>

<div class="app">
  {#if photoThumbUrl}
    <div class="bg-thumb" style="background-image: url({photoThumbUrl})" />
  {/if}

  {#if photoInfo?.download_url}
    <div
      class="bg-photo"
      style="background-image: url({photoInfo.download_url})"
    />
  {:else if photoInfo?.url}
    <div class="bg-photo" style="background-image: url({photoInfo.url})" />
  {/if}

  <div class="footer">
    <div class="info">
      {#if photoInfo?.url}
        {#if photoProvider === "bing"}
          <a
            class="item link border-ani-link"
            href="https://bing.com"
            target="_blank"
          >
            <span>{photoInfo.title || ""}</span>
            <span>{photoInfo.copyright || ""}</span>
            <span>&nbsp;&rarr;&nbsp;Bing.com</span>
          </a>
        {:else if photoProvider === "random"}
          <a
            class="item link border-ani-link"
            href={photoInfo.url}
            target="_blank"
          >
            <svg version="1.1" viewBox="0 0 32 32" width="32" height="32">
              <path
                d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
                fill="#fff"
              />
            </svg>
            <span>{photoInfo.author || ""}</span>
          </a>
        {/if}
      {/if}
    </div>

    <div class="info">
      {#if VITE_BEIAN_NO && VITE_BEIAN_SITE}
        <a class="item link border-ani-link" href={VITE_BEIAN_SITE}>
          <span>{VITE_BEIAN_NO}</span>
        </a>
      {/if}
      {#if VITE_MY_NAME && VITE_MY_SITE}
        <a class="item link border-ani-link" href={VITE_MY_SITE}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--carbon"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z"
              fill="currentColor"
            />
          </svg>
          <span>{VITE_MY_NAME}</span>
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .app {
    height: 100%;
    overflow: hidden;
  }

  .bg-thumb,
  .bg-photo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat, no-repeat;
    background-position: center center, center center;
    background-size: cover, cover;
  }

  .bg-thumb {
    z-index: 1;
  }

  .bg-photo {
    z-index: 2;
    animation: fadeIn 1s;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 24px;
    padding: 20px;
    font-size: 14px;
    z-index: 9;
  }

  .footer .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 0px;
    column-gap: 10px;
  }

  .footer .info .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 0px;
    column-gap: 10px;
    color: #fff;
    text-decoration: none;
    text-shadow: 0 1px rgb(0 0 0 / 4%);
    opacity: 0.8;
    transition: opacity 0.1s ease-in-out;
  }

  .footer .info .item:hover {
    opacity: 1;
  }

  .footer .info .item svg {
    width: 16px;
    height: 16px;
  }

  .border-ani-link {
    padding-bottom: 1px;
    color: white;
    position: relative;
  }

  .border-ani-link::after {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    bottom: 0;
    opacity: 0;
    transform: translateY(3px);
    background: white;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .border-ani-link:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
</style>
