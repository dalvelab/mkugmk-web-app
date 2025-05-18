'use strict';

/**
 * faq-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::faq-page.faq-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::faq-page.faq-page').findMany({
      populate: ['questions_with_answers'],
      locale
    });

    return { data: response[0] };
  }
}));
