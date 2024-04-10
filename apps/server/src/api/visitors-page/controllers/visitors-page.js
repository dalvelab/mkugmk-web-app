'use strict';

/**
 * visitors-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::visitors-page.visitors-page', {
  async find(ctx) {
    const locale = ctx.query.locale || 'all';
    
    // params for populating pages
    const isTicketsPage = ctx.query.isTicketsPage && ctx.query.isTicketsPage === 'true' ? true : false;
    const isInteractivePlaygroundPage = 
      ctx.query.isInteractivePlaygroundPage && ctx.query.isInteractivePlaygroundPage === 'true' 
        ? true 
        : false;
    const isCafeAndSouvenirsPage = 
      ctx.query.isCafeAndSouvenirsPage && ctx.query.isCafeAndSouvenirsPage === 'true' 
        ? true 
        : false;
    const isWorkingHoursPage = 
      ctx.query.isWorkingHoursPage && ctx.query.isWorkingHoursPage === 'true' 
        ? true 
        : false;
    const isNavigationPage = 
      ctx.query.isNavigationPage && ctx.query.isNavigationPage === 'true' 
        ? true 
        : false;

    const response = await strapi.entityService.findMany('api::visitors-page.visitors-page', {
      populate: {
        tickets_page: {
          populate: {
            tickets: {
              populate: {
                categories: isTicketsPage
              }
            },
            other_services: isTicketsPage,
            documents: isTicketsPage,
          }
        },
        interactive_playground_page: {
          populate: {
            interactive_playgrounds: {
              populate: {
                image: isInteractivePlaygroundPage,
                modal_image: isInteractivePlaygroundPage,
              }
            }
          }
        },
        cafe_and_souvenirs_page: {
          populate: {
            cafes_and_souvenirs: {
              populate: {
                image: isCafeAndSouvenirsPage,
                modal_image: isCafeAndSouvenirsPage
              }
            }
          }
        },
        working_hours_page: {
          populate: {
            public_areas: {
              populate: {
                working_time: isWorkingHoursPage
              }
            }
          }
        },
        navigation_page: {
          populate: {
            addresses: isNavigationPage,
            how_to_get_to_museum: isNavigationPage,
            complex_map: isNavigationPage
          }
        }
      },
      locale
    });

    return { data: response };
  }
});
