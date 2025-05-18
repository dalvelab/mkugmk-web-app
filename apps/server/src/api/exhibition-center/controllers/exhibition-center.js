'use strict';

/**
 * exhibition-center controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exhibition-center.exhibition-center', ({strapi}) => ({
  async find(ctx) {
    const locale = ctx.query.locale || 'all';
    const isPopulated = (ctx.query.isPopulated && ctx.query.isPopulated === 'true' ? true : false) && true;

    const response = await strapi.documents('api::exhibition-center.exhibition-center').findMany({
      populate: {
        gallery: isPopulated,
        banner: isPopulated,
        youtube_gallery: isPopulated,
        working_time: isPopulated,
      },
      locale
    });

    return { data: response };
  },
  async findOne(ctx) {
    const id = ctx.request.params.id;

    const response = await strapi.documents("api::exhibition-center.exhibition-center").findMany({
      populate: [
        "gallery",
        "banner",
        "youtube_gallery",
        "working_time",
        "additional_center",
        "additional_center.gallery",
      ],
      filters:{
        id: {
          $eq: id
        }
      }
    });

    return {data: response[0]}
  }
}));
