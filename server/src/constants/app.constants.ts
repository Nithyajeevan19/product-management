export const PAGINATION_CONSTANTS = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCTS_BY_ID: '/api/products/:id',
  PRODUCTS_SEARCH: '/api/products/search'
} as const;

export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}