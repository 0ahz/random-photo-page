import type { PhotoQuery, PhotoInfo } from "./base";

let { VITE_APP_BING_WALLPAPER_API } = import.meta.env;

export async function queryBingPhoto(
  params: PhotoQuery = {}
): Promise<PhotoInfo> {
  const cacheData = getCacheData();
  if (cacheData) return cacheData;
  const result = await fetch(VITE_APP_BING_WALLPAPER_API).then((res) =>
    res.json()
  );
  setCacheData(result);
  return result;
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
