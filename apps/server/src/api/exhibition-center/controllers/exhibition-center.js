'use strict';

/**
 * exhibition-center controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exhibition-center.exhibition-center', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const data = await strapi.entityService.findMany('api::exhibition-center.exhibition-center', {
      populate: ['gallery', 'banner', 'youtube_gallery', 'working_time'],
      locale
    });

    return data;
  }
}));
