'use strict';

/**
 * partner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partner.partner', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::partner.partner', {
      populate: ['contacts', 'image'],
      locale
    });

    return { data: response };
  }
}));
