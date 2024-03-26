'use strict';

/**
 * partners-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partners-page.partners-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::partners-page.partners-page', {
      populate: ['partners', 'partners.image'],
      locale
    });

    return { data: response };
  }
}));
