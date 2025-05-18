'use strict';

/**
 * rules-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rules-page.rules-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::rules-page.rules-page').findMany({locale});

    return { data: response[0] };
  }
}));
