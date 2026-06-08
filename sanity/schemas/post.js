export default {
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Extrait / résumé',
      type: 'text',
      rows: 3,
      description: 'Court résumé affiché dans la liste des articles (2-3 phrases)',
    },
    {
      name: 'body',
      title: 'Corps de l\'article',
      type: 'array',
      of: [
        {type: 'block'},
        {
          name: 'table',
          title: 'Tableau',
          type: 'object',
          fields: [
            {
              name: 'rows',
              title: 'Lignes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  title: 'Ligne',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cellules',
                      type: 'array',
                      of: [{type: 'string'}],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            prepare() {
              return {title: 'Tableau'}
            },
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      description: 'Estimation du temps de lecture',
    },
    {
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      description: 'Meta description pour le référencement (max 160 caractères)',
    },
  ],
  orderings: [
    {
      title: 'Date de publication',
      name: 'publishedAt',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      publishedAt: 'publishedAt',
    },
    prepare({title, subtitle, publishedAt}) {
      return {
        title: title || 'Sans titre',
        subtitle: subtitle
          ? (subtitle.length > 80 ? subtitle.slice(0, 80) + '…' : subtitle)
          : (publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : ''),
      }
    },
  },
}
