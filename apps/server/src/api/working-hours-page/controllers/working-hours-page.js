'use strict';

/**
 * working-hours-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::working-hours-page.working-hours-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::working-hours-page.working-hours-page').findMany({
      populate: ['public_areas', 'public_areas.working_time'],
      locale
    });

    return { data: response[0] };
  }
}));
