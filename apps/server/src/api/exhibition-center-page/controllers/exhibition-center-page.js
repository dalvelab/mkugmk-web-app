'use strict';

/**
 * exhibition-center-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exhibition-center-page.exhibition-center-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::exhibition-center-page.exhibition-center-page', {
      populate: ['exhibition_centers', 'exhibition_centers.banner', 'exhibition_centers.working_time'],
      locale
    });

    return { data: response };
  }
}));
