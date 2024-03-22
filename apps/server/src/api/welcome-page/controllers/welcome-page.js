'use strict';

/**
 * welcome-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::welcome-page.welcome-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::welcome-page.welcome-page', {
      populate: ['gallery', 'banner', 'youtube_gallery', 'video_preview'],
      locale
    });

    return { data: response };
  }
}));
