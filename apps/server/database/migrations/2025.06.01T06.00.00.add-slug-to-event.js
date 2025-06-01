const CyrillicToTranslit = require("cyrillic-to-translit-js");

const cyrillicToTranslit = new CyrillicToTranslit();

module.exports = {
  async up() {
    console.log('MIGRATION STARTED!!!');
    await strapi.db.transaction(async () => {
      // Example: custom service method
    const totalEntries = await strapi.db.query('api::event.event').count();
    console.log('TOTAL ENTRIES', totalEntries);
    const entries = await strapi.db.query('api::event.event').findMany({
        select: ['documentId', 'title'],
    });
    let updatedAmount = 0;

    for (let i = 0; i < entries.length; i++) {
      console.log('UPDATING ENTRY', entries[i]);

      const title = entries[i].title.replace(/,/gi, '');

      console.log('GONNA BUILD SLUG ON THIS TITLE', title);

      const slug = cyrillicToTranslit.transform(title, "-").toLowerCase();

      console.log('GOT THIS SLUG, TRY TO SAVE IT', slug);

      await strapi.db.query('api::event.event').update({
        where: { documentId: entries[i].documentId },
        data: {
          slug,
        },
      })

      await strapi.documents('api::event.event').publish({
        documentId: entries[i].documentId,
      })
      updatedAmount++
      }

      console.log(`MIGRATION FINISHED, UPDATED ${updatedAmount} from ${totalEntries}`);
    });
  },
};