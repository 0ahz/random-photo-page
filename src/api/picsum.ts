const PICSUM_API_URL = 'https://picsum.photos';

export interface RandomPhotoParams {
  width: number;
  height: number;
  blur?: number;
  format?: 'jpg' | 'webp';
}

export interface PhotoInfo {
  id: string;
  author: string;
  url: string;
  download_url: string;
  height: number;
  width: number;
}

export function queryRandomPhoto(params?: RandomPhotoParams): Promise<string> {
  const opt: RandomPhotoParams = {
    width: 10,
    height: 10,
    blur: 2,
    format: 'jpg',
    ...params,
  };
  return fetch(
    `${PICSUM_API_URL}/seed/${Date.now()}/${opt.width}/${opt.height}.${
      opt.format
    }?blur=${opt.blur}`
  ).then((res) => res.url);
}

export function queryPhotoInfo(url: string): Promise<PhotoInfo> {
  let matchs = url.match(/\/id\/([\d]+)\//);
  if (!matchs) {
    return Promise.reject('photo id not fount');
  }
  return fetch(`${PICSUM_API_URL}/id/${matchs[1]}/info`).then((res) =>
    res.json()
  );
}
