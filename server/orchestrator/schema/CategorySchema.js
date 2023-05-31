const axios = require('axios');
const redis = require('../config/redisConnection');

const SERVER_USER_URL = process.env.SERVER_USER_URL || 'http://localhost:4001';
const SERVER_APP_URL =  process.env.SERVER_APP_URL || 'http://localhost:4002';


const typeDefs = `#graphql
    type Category {
      id: ID
      name: String
      createdAt: String
      updatedAt: String
    }

    input CategoryForm {
      name: String
    }

    type Query {
      findCategories: [Category]
    }

    type Mutation {
      addCategory(newCategory: CategoryForm!): Category
      editCategory(id: ID!, editCategory: CategoryForm!) : ResponseMessage
      deleteCategory(id: ID!) : ResponseMessage
    }

`;

const resolvers = {
  Query: {
    findCategories: async () => {
      try {
        const categoriesCache = await redis.get('categories');

        if (categoriesCache) {
          const categories = JSON.parse(categoriesCache);

          return categories
        } else {
          const { data } = await axios.get(SERVER_APP_URL + '/categories');

          await redis.set('categories', JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addCategory: async (_, args) => {
      try {
        const { data } = await axios.post(SERVER_APP_URL + '/categories', args.newCategory);

        await redis.del('categories');
        return data;
      } catch (error) {
        return error;
      }
    },
    editCategory: async (_, args) => {
      try {
        const { data } = await axios.put(SERVER_APP_URL + '/categories/' + args.id, args.editCategory);

        await redis.del('categories');
        return data;
      } catch (error) {
        return error;
      }
    },
    deleteCategory: async (_, args) => {
      try {
        const { data } = await axios.delete(SERVER_APP_URL + '/categories/' + args.id);

        await redis.del('categories');
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
