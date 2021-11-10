import { corsFetch } from "./base";
import type { PhotoQuery, PhotoInfo } from "./base";

export async function queryBingPhoto(
  params: PhotoQuery = {}
): Promise<PhotoInfo> {
  const cacheData = getCacheData();
  if (cacheData) return cacheData;
  const baseUrl = "https://cn.bing.com";
  const query: PhotoQuery = {
    format: "js",
    idx: 0,
    n: 1,
    uhd: 1,
    uhdwidth: 3840,
    uhdheight: 2160,
    ...params,
  };
  const querystring = Object.keys(query)
    .map((k) => `${k}=${query[k]}`)
    .join("&");
  const reqUrl = `${baseUrl}/HPImageArchive.aspx?${querystring}`;
  const result = await corsFetch(reqUrl).then((res) => res.json());
  if (!result?.images?.length) return null;
  const image = result.images[0];
  const url = `${baseUrl}${image.url}`;
  let title = "",
    author = "";
  const arr = image.copyright?.match(/^(.*)[（\(](.*)[）\)]$/);
  if (arr) {
    title = arr[1];
    author = arr[2];
  } else {
    title = image.title;
    author = image.copyright;
  }
  const data = {
    id: image.hsh,
    title,
    author,
    url,
    download_url: url,
  };
  setCacheData(data);
  return data;
}

function setCacheData(data: PhotoInfo): void {
  if (!data) return;
  const todayKey = `bing_${getToday()}`;
  const yesterdayKey = `bing_${getYesterday()}`;
  window.localStorage.setItem(todayKey, JSON.stringify(data));
  window.localStorage.removeItem(yesterdayKey);
}

function getCacheData(): PhotoInfo {
  const todayKey = `bing_${getToday()}`;
  const result = window.localStorage.getItem(todayKey);
  try {
    return JSON.parse(result) as PhotoInfo;
  } catch (error) {}
  return null;
}

const getToday = (): string => {
  let d = new Date();
  return fmtDate(d);
};

const getYesterday = (): string => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return fmtDate(d);
};

const fmtDate = (d: Date = new Date()): string => {
  return d.toISOString().split("T")[0]?.replace(/-/g, "");
};
