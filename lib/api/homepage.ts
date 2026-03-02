import { api } from "./client";

export interface HeroBanner {
  _id?: string;
  heading: string;
  subheading?: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  visible: boolean;
  order: number;
}

export interface FeaturedCollection {
  _id?: string;
  collectionId:
    | string
    | { _id: string; name: string; slug: string; coverImage?: string };
  name: string;
  image?: string;
  visible: boolean;
  order: number;
}

export interface HomepageContent {
  _id: string;
  announcementEnabled: boolean;
  announcementText?: string;
  heroBanners: HeroBanner[];
  featuredCollections: FeaturedCollection[];
  updatedAt: string;
}

export const homepageApi = {
  get: () =>
    api.get<{ status: string; data: HomepageContent }>("/homepage", {
      auth: false,
    }),

  update: (data: Partial<HomepageContent>) =>
    api.patch<{ status: string; data: HomepageContent }>("/homepage", data),
};
