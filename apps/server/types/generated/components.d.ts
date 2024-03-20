import type { Schema, Attribute } from '@strapi/strapi';

export interface ServicesOther extends Schema.Component {
  collectionName: 'components_services_others';
  info: {
    displayName: 'Other';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.String & Attribute.Required;
    additional_text: Attribute.String;
    caption: Attribute.String;
  };
}

export interface ServicesTicketCategory extends Schema.Component {
  collectionName: 'components_services_ticket_categories';
  info: {
    displayName: 'TicketCategory';
  };
  attributes: {
    type: Attribute.Enumeration<['adult', 'child', 'benefit']>;
    caption: Attribute.String;
    price: Attribute.Integer;
  };
}

export interface ServicesTicket extends Schema.Component {
  collectionName: 'components_services_tickets';
  info: {
    displayName: 'Ticket';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    additional_text: Attribute.String;
    categories: Attribute.Component<'services.ticket-category', true>;
    available_on_website: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface SharedContact extends Schema.Component {
  collectionName: 'components_shared_contacts';
  info: {
    displayName: 'Contact';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['email', 'phone', 'address']> &
      Attribute.Required;
    text: Attribute.String & Attribute.Required;
    caption: Attribute.String;
  };
}

export interface SharedPage extends Schema.Component {
  collectionName: 'components_shared_pages';
  info: {
    displayName: 'Page';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface SharedSocial extends Schema.Component {
  collectionName: 'components_shared_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    type: Attribute.Enumeration<['vk', 'telegram', 'youtube']>;
    link: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
  };
}

export interface SharedWorkingTime extends Schema.Component {
  collectionName: 'components_shared_working_times';
  info: {
    displayName: 'WorkingTime';
    icon: 'clock';
    description: '';
  };
  attributes: {
    day: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
    opened: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface SharedYoutubeVideo extends Schema.Component {
  collectionName: 'components_shared_youtube_videos';
  info: {
    displayName: 'YoutubeVideo';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    video_id: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'services.other': ServicesOther;
      'services.ticket-category': ServicesTicketCategory;
      'services.ticket': ServicesTicket;
      'shared.contact': SharedContact;
      'shared.page': SharedPage;
      'shared.social': SharedSocial;
      'shared.working-time': SharedWorkingTime;
      'shared.youtube-video': SharedYoutubeVideo;
    }
  }
}
