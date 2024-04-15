'use strict';

/**
 * rules-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rules-page.rules-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::rules-page.rules-page', {locale});

    return { data: response };
  }
}));
