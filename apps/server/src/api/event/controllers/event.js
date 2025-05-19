'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({strapi}) => ({
  async findOne(ctx) {
    const locale = ctx.query.locale || 'all';
    const id = ctx.request.params.id;

    const response = await strapi.documents('api::event.event').findOne({
      documentId: id,
      populate: ['image'],
      locale
    });

    return {data: response}
  }
}));
