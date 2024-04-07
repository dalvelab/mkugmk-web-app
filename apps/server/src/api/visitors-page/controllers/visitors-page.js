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

    const response = await strapi.entityService.findMany('api::visitors-page.visitors-page', {
      populate: {
        tickets_page: {
          populate: {
            tickets: isTicketsPage,
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
        }
      },
      locale
    });

    return { data: response };
  }
});
