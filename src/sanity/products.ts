import { defineType } from 'sanity';

// schemas/product.js
export default defineType({
    name: 'product',  // The document type name
    title: 'Product',  // The title of the schema
    type: 'document',
    fields: [
      {
        name: 'status',
        title: 'Status',
        type: 'string',
      },
      {
        name: 'name',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'shortDescription',
        title: 'Short Description',
        type: 'string',
      },
      {
        name: 'color',
        title: 'Color',
        type: 'string',
      },
      {
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'inventory',
        title: 'Inventory',
        type: 'number',
      },
      {
        name: 'brandName',
        title: 'Brand Name',
        type: 'string',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'sku',
        title: 'SKU',
        type: 'string',
      },
      {
        name: 'returnPolicy',
        title: 'Return Policy',
        type: 'string',
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule) => Rule.min(0).max(5).error('Rating should be between 0 and 5'),
      },
      {
        name: 'currentPrice',
        title: 'Current Price',
        type: 'number',
      },
      {
        name: 'discountedPrice',
        title: 'Discounted Price',
        type: 'number',
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  });
  