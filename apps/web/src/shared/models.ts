export type ApiResponse<Data, Meta> = {
  data: Data | null;
  meta: Meta | StrapiMeta | null;
  error: {
    status: number;
    message: number;
    name: number;
  } | null
}

export type StrapiMeta = {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
  }
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

export type WeekDay = 'mon' | 'tue' | 'wed' | 'thurs' | 'fri' | 'sat' | 'sun';

export type StrapiWorkingTime = {
  id: number;
  day: WeekDay;
  value: string;
  opened: boolean;
}

export type StrapiSocialNetwork = {
  id: number;
  type: 'vk' | 'telegram' | 'youtube';
  link: string;
  name: string;
}

export type StrapiContact = {
  id: number;
  type: 'phone' | 'email' | 'address';
  text: string;
  caption: string | null;
}

export type StrapiInfoCard = {
  id: number;
  name: string;
  short_description?: string;
  image: StrapiMedia;
  description: string;
  type: 'partners' | 'cafes_and_souvenirs' | 'interactive_playground';
  modal_image: StrapiMedia | null;
  address: string;
  phone?: string;
  working_hours?: string;
  email?: string;
  tickets?: string;
  reference_to_other_source?: string;
}