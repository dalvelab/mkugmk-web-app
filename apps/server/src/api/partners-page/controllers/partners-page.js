'use strict';

/**
 * partners-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partners-page.partners-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::partners-page.partners-page').findMany({
      populate: ['partners', 'partners.image', 'partners.modal_image'],
      locale
    });

    return { data: response[0] };
  }
}));
