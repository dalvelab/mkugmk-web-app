'use strict';

/**
 * footer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::footer.footer', {
      populate: ['contacts', 'pages', 'socials', 'working_time'],
      locale
    });

    return { data: response };
  }
}));
