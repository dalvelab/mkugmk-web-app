'use strict';

/**
 * benefits-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::benefits-page.benefits-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::benefits-page.benefits-page', {locale});

    return { data: response };
  }
}));
