import type { PhotoQuery, PhotoInfo } from "./base";

export async function queryRandomPhotoThumbUrl(
  params?: PhotoQuery
): Promise<string> {
  const opt: PhotoQuery = {
    width: 10,
    height: 10,
    blur: 2,
    format: "jpg",
    ...params,
  };
  const url = `https://picsum.photos/seed/${Date.now()}/${opt.width}/${
    opt.height
  }.${opt.format}?blur=${opt.blur}`;
  return await fetch(url).then((res) => res.url);
}

export async function queryRandomPhoto(url: string): Promise<PhotoInfo> {
  const matchs = url.match(/\/id\/([\d]+)\//);
  if (!matchs) {
    return Promise.reject("photo id not fount");
  }
  const reqUrl = `https://picsum.photos/id/${matchs[1]}/info`;
  const result = await fetch(reqUrl).then((res) => res.json());
  if (!result) return null;
  return {
    id: result.id,
    author: result.author,
    url: result.url,
    download_url: result.download_url,
    title: "",
  };
}
