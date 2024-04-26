module.exports = ({ env }) => ({
  meilisearch: {
    enabled: true,
    config: {
      host: "http://localhost:7700",
      apiKey: env('MEILISEARCH_MASTER_KEY'),
      'exhibition-center': {
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.banner;
          delete transformedEntry.gallery;
          delete transformedEntry.youtube_gallery;
          delete transformedEntry.working_time;

          return transformedEntry;
        },
      },
      event: {
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.image;

          return transformedEntry;
        },
      },
      'tickets-page': {
        indexName: 'visitors',
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.tickets;
          delete transformedEntry.documents;
          delete transformedEntry.other_services;

          return transformedEntry;
        },
      },
      'navigation-page': {
        indexName: 'visitors',
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.how_to_get_to_museum;
          delete transformedEntry.addresses;
          delete transformedEntry.yandex_map_embed;
          delete transformedEntry.complex_map;

          return transformedEntry;
        },
      },
      'cafe-and-souvenirs-page': {
        indexName: 'visitors',
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.cafes_and_souvenirs;

          return transformedEntry;
        },
      },
      'interactive-playground-page': {
        indexName: 'visitors',
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.interactive_playgrounds;

          return transformedEntry;
        },
      },
      'working-hours-page': {
        indexName: 'visitors',
        transformEntry({ entry }) {
          const transformedEntry = entry;

          delete transformedEntry.public_areas;

          return transformedEntry;
        },
      },
      'rules-page': {
        indexName: 'visitors',
      },
      'benefits-page': {
        indexName: 'visitors',
      }
    }
  }
});
