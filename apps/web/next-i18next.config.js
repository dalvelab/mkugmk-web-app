/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};