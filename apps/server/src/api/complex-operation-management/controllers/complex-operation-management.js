'use strict';

/**
 * complex-operation-management controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::complex-operation-management.complex-operation-management', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.entityService.findMany('api::complex-operation-management.complex-operation-management', {
      populate: ['common_operating_hours', 'special_days_operating_hours'],
      locale
    });

    return { data: response };
  }
}));
