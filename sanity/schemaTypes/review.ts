export default {
  name: 'review',
  type: 'document',
  title: 'Customer Reviews',
  fields: [
    {
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      title: 'Product',
    },
    {
      name: 'userName',
      type: 'string',
      title: 'User Name',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Comment',
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: new Date().toISOString(),
    },
  ],
};