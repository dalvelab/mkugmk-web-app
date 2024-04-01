'use strict';

/**
 * contacts-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contacts-page.contacts-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::contacts-page.contacts-page', {
      populate: ['contacts'],
      locale
    });

    return { data: response };
  }
}));
