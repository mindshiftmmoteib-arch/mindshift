import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'autonomyowner/Moteib-'
      }
    : {
        kind: 'local',
      },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*/',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title (English)' } }),
        titleEn: fields.text({
          label: 'Title (English)',
          validation: { length: { min: 1 } }
        }),
        titleAr: fields.text({
          label: 'Title (Arabic)',
          validation: { length: { min: 1 } }
        }),
        excerptEn: fields.text({
          label: 'Excerpt (English)',
          multiline: true,
          validation: { length: { min: 1 } }
        }),
        excerptAr: fields.text({
          label: 'Excerpt (Arabic)',
          multiline: true,
          validation: { length: { min: 1 } }
        }),
        contentEn: fields.markdoc({
          label: 'Content (English)',
          extension: 'mdoc',
        }),
        contentAr: fields.markdoc({
          label: 'Content (Arabic)',
          extension: 'mdoc',
        }),
        published: fields.checkbox({
          label: 'Published',
          defaultValue: false,
        }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
      },
    }),
  },
});
