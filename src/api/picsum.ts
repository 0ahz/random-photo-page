const PICSUM_API_URL = 'https://picsum.photos';

export type RandomQuery = {
  width: number;
  height: number;
  blur?: number;
  format?: 'jpg' | 'webp';
};

export type RandomPhotoInfo = {
  id: string;
  author: string;
  url: string;
  download_url: string;
  height: number;
  width: number;
};

export function queryRandomPhoto(params?: RandomQuery): Promise<string> {
  const opt: RandomQuery = {
    width: 10,
    height: 10,
    blur: 2,
    format: 'jpg',
    ...params,
  };
  const url = `${PICSUM_API_URL}/seed/${Date.now()}/${opt.width}/${
    opt.height
  }.${opt.format}?blur=${opt.blur}`;
  return fetch(url).then((res) => res.url);
}

export function queryPhotoInfo(url: string): Promise<RandomPhotoInfo> {
  const matchs = url.match(/\/id\/([\d]+)\//);
  if (!matchs) {
    return Promise.reject('photo id not fount');
  }
  const reqUrl = `${PICSUM_API_URL}/id/${matchs[1]}/info`;
  return fetch(reqUrl).then((res) => res.json());
}
