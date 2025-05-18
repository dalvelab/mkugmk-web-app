import type { Schema, Struct } from '@strapi/strapi';

export interface ContactsDepartmentContact extends Struct.ComponentSchema {
  collectionName: 'components_contacts_department_contacts';
  info: {
    description: '';
    displayName: 'DepartmentContact';
  };
  attributes: {
    caption: Schema.Attribute.String;
    department: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.Email;
    enable_order_call_modal: Schema.Attribute.Boolean;
    phone: Schema.Attribute.String;
  };
}

export interface FaqFaq extends Struct.ComponentSchema {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    answer: Schema.Attribute.RichText;
    question: Schema.Attribute.String & Schema.Attribute.Required;
    topic: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterContact extends Struct.ComponentSchema {
  collectionName: 'components_footer_contacts';
  info: {
    description: '';
    displayName: 'ContactFooter';
  };
  attributes: {
    caption: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['email', 'phone', 'address']> &
      Schema.Attribute.Required;
  };
}

export interface FooterPage extends Struct.ComponentSchema {
  collectionName: 'components_shared_pages';
  info: {
    description: '';
    displayName: 'Page';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_socials';
  info: {
    description: '';
    displayName: 'Social';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['vk', 'telegram', 'youtube']>;
  };
}

export interface SharedAdditionalExhibitionCenter
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_additional_exhibition_centers';
  info: {
    displayName: 'Additional Exhibition Center';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    gallery: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards';
  info: {
    description: '';
    displayName: 'Info Card';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.RichText;
    email: Schema.Attribute.Email;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    modal_image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    reference_to_other_source: Schema.Attribute.String;
    short_description: Schema.Attribute.String;
    tickets: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['partners', 'cafes_and_souvenirs', 'interactive_playground']
    > &
      Schema.Attribute.Required;
    working_hours: Schema.Attribute.String;
  };
}

export interface SharedOperatingHoursInCurrentDay
  extends Struct.ComponentSchema {
  collectionName: 'components_shared_operating_hours_in_current_days';
  info: {
    description: '';
    displayName: 'OperatingHoursInCurrentDay';
  };
  attributes: {
    day: Schema.Attribute.Date & Schema.Attribute.Required;
    exhibition_centers: Schema.Attribute.Relation<
      'oneToMany',
      'api::exhibition-center.exhibition-center'
    >;
    opened: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedWorkingTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_working_times';
  info: {
    description: '';
    displayName: 'WorkingTime';
    icon: 'clock';
  };
  attributes: {
    day: Schema.Attribute.Enumeration<
      ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']
    >;
    opened: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedYoutubeVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_youtube_videos';
  info: {
    description: '';
    displayName: 'YoutubeVideo';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    video_id: Schema.Attribute.String;
  };
}

export interface VisitorsAddress extends Struct.ComponentSchema {
  collectionName: 'components_visitors_addresses';
  info: {
    description: '';
    displayName: 'Address';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsCafeAndSouvenirsPage extends Struct.ComponentSchema {
  collectionName: 'components_visitors_cafe_and_souvenirs_pages';
  info: {
    displayName: 'Cafe And Souvenirs Page';
  };
  attributes: {
    cafes_and_souvenirs: Schema.Attribute.Component<'shared.info-card', true>;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsInteractivePlaygroudPage
  extends Struct.ComponentSchema {
  collectionName: 'components_visitors_interactive_playgroud_pages';
  info: {
    description: '';
    displayName: 'Interactive Playgroud Page';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    interactive_playgrounds: Schema.Attribute.Component<
      'shared.info-card',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsMainServices extends Struct.ComponentSchema {
  collectionName: 'components_visitors_main_services';
  info: {
    description: '';
    displayName: 'Main Services';
  };
  attributes: {
    additional_text: Schema.Attribute.String;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    tickets: Schema.Attribute.Component<'visitors.ticket-new', true>;
    value: Schema.Attribute.String;
  };
}

export interface VisitorsNavigationPage extends Struct.ComponentSchema {
  collectionName: 'components_visitors_navigation_pages';
  info: {
    description: '';
    displayName: 'Navigation Page';
  };
  attributes: {
    addresses: Schema.Attribute.Component<'visitors.address', true>;
    complex_map: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    how_to_get_to_museum: Schema.Attribute.Component<
      'visitors.transport',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    yandex_map_embed: Schema.Attribute.String;
  };
}

export interface VisitorsOther extends Struct.ComponentSchema {
  collectionName: 'components_services_others';
  info: {
    description: '';
    displayName: 'Other Services';
  };
  attributes: {
    additional_text: Schema.Attribute.RichText;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface VisitorsPublicArea extends Struct.ComponentSchema {
  collectionName: 'components_visitors_public_areas';
  info: {
    description: '';
    displayName: 'Public Area';
  };
  attributes: {
    name: Schema.Attribute.String;
    working_time: Schema.Attribute.Component<'shared.working-time', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 7;
        },
        number
      >;
  };
}

export interface VisitorsTicketCategory extends Struct.ComponentSchema {
  collectionName: 'components_services_ticket_categories';
  info: {
    description: '';
    displayName: 'Ticket Category';
  };
  attributes: {
    caption: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
  };
}

export interface VisitorsTicketNew extends Struct.ComponentSchema {
  collectionName: 'components_visitors_ticket_news';
  info: {
    description: '';
    displayName: 'Ticket New';
  };
  attributes: {
    additional_text: Schema.Attribute.Text;
    available_on_website: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    categories: Schema.Attribute.Component<'visitors.ticket-category', true>;
    is_excursion: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsTicketTypes extends Struct.ComponentSchema {
  collectionName: 'components_visitors_ticket_types';
  info: {
    description: '';
    displayName: 'Ticket';
  };
  attributes: {
    additional_text: Schema.Attribute.String;
    available_on_website: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    categories: Schema.Attribute.Component<'visitors.ticket-category', true> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsTransport extends Struct.ComponentSchema {
  collectionName: 'components_visitors_transports';
  info: {
    description: '';
    displayName: 'Transport';
  };
  attributes: {
    caption: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['public_transport', 'other']> &
      Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitorsWorkingHoursPage extends Struct.ComponentSchema {
  collectionName: 'components_visitors_working_hours_pages';
  info: {
    description: '';
    displayName: 'Working Hours Page';
  };
  attributes: {
    public_areas: Schema.Attribute.Component<'visitors.public-area', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contacts.department-contact': ContactsDepartmentContact;
      'faq.faq': FaqFaq;
      'footer.contact': FooterContact;
      'footer.page': FooterPage;
      'footer.social': FooterSocial;
      'shared.additional-exhibition-center': SharedAdditionalExhibitionCenter;
      'shared.info-card': SharedInfoCard;
      'shared.operating-hours-in-current-day': SharedOperatingHoursInCurrentDay;
      'shared.working-time': SharedWorkingTime;
      'shared.youtube-video': SharedYoutubeVideo;
      'visitors.address': VisitorsAddress;
      'visitors.cafe-and-souvenirs-page': VisitorsCafeAndSouvenirsPage;
      'visitors.interactive-playgroud-page': VisitorsInteractivePlaygroudPage;
      'visitors.main-services': VisitorsMainServices;
      'visitors.navigation-page': VisitorsNavigationPage;
      'visitors.other': VisitorsOther;
      'visitors.public-area': VisitorsPublicArea;
      'visitors.ticket-category': VisitorsTicketCategory;
      'visitors.ticket-new': VisitorsTicketNew;
      'visitors.ticket-types': VisitorsTicketTypes;
      'visitors.transport': VisitorsTransport;
      'visitors.working-hours-page': VisitorsWorkingHoursPage;
    }
  }
}
