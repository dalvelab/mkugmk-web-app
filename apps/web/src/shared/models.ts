export type ApiResponse<Data, Meta> = {
  data: Data | null;
  meta: Meta | null;
  error: {
    status: number;
    message: number;
    name: number;
  } | null
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

export type StrapiYoutubeVideo = {
  id: number;
  name: string;
  video_id: string;
}

export type StrapiWorkingTime = {
  id: number;
  day: string;
  value: string;
  opened: boolean;
}

export type StrapiContact = {
  id: number;
  type: 'phone' | 'email' | 'address';
  text: string;
  caption: string | null;
}