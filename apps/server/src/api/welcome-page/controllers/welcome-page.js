"use strict";

/**
 * welcome-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::welcome-page.welcome-page",
  ({ strapi }) => ({
    async find(ctx) {
      const locale = ctx.query.locale || "all";

      const response = await strapi.documents("api::welcome-page.welcome-page").findMany({
        populate: [
          "banner",
          "youtube_gallery",
          "video_preview",
          "exhibition_centers",
          "exhibition_centers.banner",
          "exhibition_centers.working_time",
        ],
        locale,
      });

      return { data: response[0] };
    },
  })
);
