export type ApiResponse<Data, Meta> = {
  data: Data | null;
  meta: Meta | null;
}

export type StrapiMedia = {
  id: number;
  name: string;
  url: string;
  caption: string | null,
  width: number;
  height: number;
  mime: string;
  formats?: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
  }
}

export type StrapiImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export type DefaultRequestParams = {
  locale?: string;
}