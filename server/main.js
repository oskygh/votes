import { WebApp } from 'meteor/webapp'
import { getUser } from 'meteor/apollo'

import { ApolloServer, gql } from 'apollo-server-express'

import typeDefs from '../imports/api/schema'
import resolvers from '../imports/api/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})