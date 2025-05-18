'use strict';

/**
 * complex-operation-management controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::complex-operation-management.complex-operation-management', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';

    const response = await strapi.documents("api::complex-operation-management.complex-operation-management").findMany({
      populate: [
        "common_operating_hours",
        "special_days_operating_hours",
        "special_days_operating_hours.exhibition_centers",
      ],
      locale,
    });

    return { data: response[0] };
  }
}));
