'use strict';

/**
 * interactive-playground-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::interactive-playground-page.interactive-playground-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::interactive-playground-page.interactive-playground-page').findMany({
      populate: ['interactive_playgrounds', 'interactive_playgrounds.image', 'interactive_playgrounds.modal_image'],
      locale
    });

    return { data: response[0] };
  }
}));
