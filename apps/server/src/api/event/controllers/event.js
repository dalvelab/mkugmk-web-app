'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({strapi}) => ({
  async findOne(ctx) {
    const id = ctx.request.params.id;

    const response = await strapi.documents('api::event.event').findMany({
      populate: ['image'],
      filters: {
        id: {
          $eq: id
        }
      }
    });

    return {data: response[0]}
  }
}));
