'use strict';

/**
 * tickets-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tickets-page.tickets-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany(
      "api::tickets-page.tickets-page",
      {
        populate: [
          "tickets",
          "tickets.categories",
          "other_services",
          "documents",
          "main_services",
          "main_services.tickets",
          "main_services.tickets.categories",
        ],
        locale,
      }
    );

    return { data: response };
  }
}));
