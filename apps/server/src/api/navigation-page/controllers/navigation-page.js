'use strict';

/**
 * navigation-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::navigation-page.navigation-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::navigation-page.navigation-page').findMany({
      populate: ['addresses', 'how_to_get_to_museum', 'complex_map'],
      locale
    });

    return { data: response[0] };
  }
}));
