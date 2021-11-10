export type PhotoQuery = {
  [k: string]: any;
};

export type PhotoInfo = {
  id: string;
  url: string;
  download_url?: string;
  title?: string;
  author?: string;
  [k: string]: any;
};

export async function corsFetch(url: string) {
  return await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
}
