import type { Schema, Attribute } from '@strapi/strapi';

export interface ContactsDepartmentContact extends Schema.Component {
  collectionName: 'components_contacts_department_contacts';
  info: {
    displayName: 'DepartmentContact';
    description: '';
  };
  attributes: {
    department: Attribute.String & Attribute.Required;
    caption: Attribute.String;
    email: Attribute.Email;
    phone: Attribute.String;
  };
}

export interface FooterContact extends Schema.Component {
  collectionName: 'components_footer_contacts';
  info: {
    displayName: 'ContactFooter';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['email', 'phone', 'address']> &
      Attribute.Required;
    text: Attribute.String & Attribute.Required;
    caption: Attribute.String;
  };
}

export interface FooterPage extends Schema.Component {
  collectionName: 'components_shared_pages';
  info: {
    displayName: 'Page';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface FooterSocial extends Schema.Component {
  collectionName: 'components_shared_socials';
  info: {
    displayName: 'Social';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['vk', 'telegram', 'youtube']>;
    link: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
  };
}

export interface SharedInfoCard extends Schema.Component {
  collectionName: 'components_shared_info_cards';
  info: {
    displayName: 'Info Card';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    short_description: Attribute.String;
    image: Attribute.Media & Attribute.Required;
    modal_image: Attribute.Media;
    description: Attribute.RichText;
    type: Attribute.Enumeration<
      ['partners', 'cafes_and_souvenirs', 'interactive_playground']
    > &
      Attribute.Required;
    address: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    working_hours: Attribute.String;
    tickets: Attribute.String;
    email: Attribute.Email;
    reference_to_other_source: Attribute.String;
  };
}

export interface SharedOperatingHoursInCurrentDay extends Schema.Component {
  collectionName: 'components_shared_operating_hours_in_current_days';
  info: {
    displayName: 'OperatingHoursInCurrentDay';
    description: '';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    day: Attribute.Date & Attribute.Required;
    opened: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
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
    value: Attribute.String & Attribute.Required;
    opened: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    day: Attribute.Enumeration<
      ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']
    >;
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

export interface VisitorsCafeAndSouvenirsPage extends Schema.Component {
  collectionName: 'components_visitors_cafe_and_souvenirs_pages';
  info: {
    displayName: 'Cafe And Souvenirs Page';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText;
    cafes_and_souvenirs: Attribute.Component<'shared.info-card', true>;
  };
}

export interface VisitorsInteractivePlaygroudPage extends Schema.Component {
  collectionName: 'components_visitors_interactive_playgroud_pages';
  info: {
    displayName: 'Interactive Playgroud Page';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText;
    interactive_playgrounds: Attribute.Component<'shared.info-card', true>;
  };
}

export interface VisitorsOther extends Schema.Component {
  collectionName: 'components_services_others';
  info: {
    displayName: 'Other Services';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.String & Attribute.Required;
    additional_text: Attribute.String;
    caption: Attribute.String;
  };
}

export interface VisitorsPublicAreaWorkingHours extends Schema.Component {
  collectionName: 'components_visitors_public_area_working_hours';
  info: {
    displayName: 'Public Area Working Hours';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    day: Attribute.Enumeration<
      ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']
    > &
      Attribute.Required;
    value: Attribute.String & Attribute.Required;
    opened: Attribute.Boolean & Attribute.Required;
  };
}

export interface VisitorsTicketCategory extends Schema.Component {
  collectionName: 'components_services_ticket_categories';
  info: {
    displayName: 'Ticket Category';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    caption: Attribute.String;
    price: Attribute.Integer;
  };
}

export interface VisitorsTicketTypes extends Schema.Component {
  collectionName: 'components_visitors_ticket_types';
  info: {
    displayName: 'Ticket';
    description: '';
  };
  attributes: {
    additional_text: Attribute.String;
    categories: Attribute.Component<'visitors.ticket-category', true> &
      Attribute.Required;
    available_on_website: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    name: Attribute.String & Attribute.Required;
  };
}

export interface VisitorsTicketsPage extends Schema.Component {
  collectionName: 'components_visitors_tickets_pages';
  info: {
    displayName: 'Tickets Page';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText;
    documents: Attribute.Media;
    secondary_title: Attribute.String & Attribute.Required;
    secondary_description: Attribute.RichText;
    other_services: Attribute.Component<'visitors.other', true>;
    tickets: Attribute.Component<'visitors.ticket-types', true> &
      Attribute.Required;
  };
}

export interface VisitorsWorkingHoursPage extends Schema.Component {
  collectionName: 'components_visitors_working_hours_pages';
  info: {
    displayName: 'Working Hours Page';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    public_areas: Attribute.Component<
      'visitors.public-area-working-hours',
      true
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contacts.department-contact': ContactsDepartmentContact;
      'footer.contact': FooterContact;
      'footer.page': FooterPage;
      'footer.social': FooterSocial;
      'shared.info-card': SharedInfoCard;
      'shared.operating-hours-in-current-day': SharedOperatingHoursInCurrentDay;
      'shared.working-time': SharedWorkingTime;
      'shared.youtube-video': SharedYoutubeVideo;
      'visitors.cafe-and-souvenirs-page': VisitorsCafeAndSouvenirsPage;
      'visitors.interactive-playgroud-page': VisitorsInteractivePlaygroudPage;
      'visitors.other': VisitorsOther;
      'visitors.public-area-working-hours': VisitorsPublicAreaWorkingHours;
      'visitors.ticket-category': VisitorsTicketCategory;
      'visitors.ticket-types': VisitorsTicketTypes;
      'visitors.tickets-page': VisitorsTicketsPage;
      'visitors.working-hours-page': VisitorsWorkingHoursPage;
    }
  }
}
