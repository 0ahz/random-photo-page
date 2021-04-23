<script lang="ts">
  import { queryRandomPhoto, queryPhotoInfo, PhotoInfo } from './api/picsum';

  let {
    VITE_MY_NAME,
    VITE_MY_SITE,
    VITE_BEIAN_NO,
    VITE_BEIAN_SITE,
  } = import.meta.env;

  VITE_MY_NAME = decodeURIComponent(VITE_MY_NAME || '');
  VITE_BEIAN_NO = decodeURIComponent(VITE_BEIAN_NO || '');

  let photoThumbUrl: string = '';
  let photoInfo: PhotoInfo = null;

  queryRandomPhoto()
    .then((photoUrl) => {
      photoThumbUrl = photoUrl;
      return queryPhotoInfo(photoUrl);
    })
    .then((info) => {
      photoInfo = info;
    });
</script>

<div class="app">
  {#if photoThumbUrl}
    <div class="bg-thumb" style="background-image: url({photoThumbUrl})" />
  {/if}

  {#if photoInfo.download_url}
    <div
      class="bg-photo"
      style="background-image: url({photoInfo.download_url})"
    />
  {/if}

  <div class="footer">
    <div class="info">
      {#if photoInfo.url}
        <a class="item link" href={photoInfo.url} target="_blank">
          <svg version="1.1" viewBox="0 0 32 32" width="32" height="32">
            <path
              d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
              fill="#fff"
            />
          </svg>
          <span>{photoInfo.author || ''}</span>
        </a>
      {/if}
    </div>

    <div class="info">
      {#if VITE_BEIAN_NO && VITE_BEIAN_SITE}
        <a class="item link" href={VITE_BEIAN_SITE}>
          <span>{VITE_BEIAN_NO}</span>
        </a>
      {/if}
      {#if VITE_MY_NAME && VITE_MY_SITE}
        <a class="item link" href={VITE_MY_SITE}>
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    font-size: 14px;
    z-index: 9;
  }

  .footer .info {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .footer .item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    text-shadow: 0 1px rgb(0 0 0 / 4%);
    opacity: 0.8;
    transition: opacity 0.1s ease-in-out;
  }

  .footer .item:hover {
    opacity: 1;
  }

  .footer .item svg {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  .footer .item + .item {
    margin-left: 20px;
  }
</style>
