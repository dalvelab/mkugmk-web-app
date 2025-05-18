'use strict';

/**
 * cafe-and-souvenirs-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cafe-and-souvenirs-page.cafe-and-souvenirs-page', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents('api::cafe-and-souvenirs-page.cafe-and-souvenirs-page').findMany({
      populate: ['cafes_and_souvenirs', 'cafes_and_souvenirs.image', 'cafes_and_souvenirs.modal_image'],
      locale
    });

    return { data: response[0] };
  }
}));
