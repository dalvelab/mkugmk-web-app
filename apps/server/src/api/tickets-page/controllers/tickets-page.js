'use strict';

/**
 * tickets-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tickets-page.tickets-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::tickets-page.tickets-page', {
      populate: ['tickets', 'tickets.categories', 'other_services', 'documents'],
      locale
    });

    return { data: response };
  }
}));
