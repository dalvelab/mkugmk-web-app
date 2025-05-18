'use strict';

/**
 * benefits-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::benefits-page.benefits-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::benefits-page.benefits-page').findMany({locale});

    return { data: response[0] };
  }
}));
