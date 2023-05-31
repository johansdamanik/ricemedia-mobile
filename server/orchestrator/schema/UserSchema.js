const axios = require('axios');

const SERVER_USER_URL = process.env.SERVER_USER_URL || 'http://localhost:4001';

const typeDefs = `#graphql
    type User {
      _id: String
      username: String
      email: String
      phoneNumber: String
      address: String
    }

    input NewUser {
      username: String
      email: String
      password: String
      phoneNumber: String
      address: String
    }

    type ResponseMessage {
      message: String
    }

    type Query {
      findUsers: [User]
    }

    type Mutation {
      addUser(newUser: NewUser!): ResponseMessage
      deleteUser(id: ID!): ResponseMessage
    }
`;

const resolvers = {
  Query: {
    findUsers: async () => {
      try {
        const { data } = await axios.get(SERVER_USER_URL + '/users');
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(SERVER_USER_URL + '/users', args.newUser);
        const response = {
          message: `User dengan ID ${data.insertedId} berhasil ditambahkan.`,
        };
        return response;
      } catch (error) {
        return error.response.status === 400 ? { message: error.response.data } : error;
      }
    },

    deleteUser: async (_, args) => {
      try {
        await axios.delete(SERVER_USER_URL + '/users/' + args.id);
        const response = {
          message: `User dengan ID ${args.id} berhasil dihapus.`,
        };
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
