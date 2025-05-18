'use strict';

/**
 * contacts-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contacts-page.contacts-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::contacts-page.contacts-page').findMany({
      populate: ['contacts'],
      locale
    });

    return { data: response[0] };
  }
}));
