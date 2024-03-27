'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({strapi}) => ({
  async findOne(ctx) {
    const id = ctx.request.params.id;

    const response = await strapi.entityService.findOne('api::event.event', id, {
      populate: ['image'],
    });

    return {data: response}
  }
}));
