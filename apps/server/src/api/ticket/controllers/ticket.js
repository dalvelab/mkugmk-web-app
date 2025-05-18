'use strict';

/**
 * ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::ticket.ticket').findMany({
      populate: ['exhibition_centers', 'exhibition_centers.banner'],
      locale
    });

    return { data: response };
  }
}));
