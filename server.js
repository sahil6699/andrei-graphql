const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const app = express()

const typesArray = loadFilesSync('**/*.graphql')
const resolversArray = loadFilesSync('**/*.resolvers.js')

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.listen(3000, () => console.log('Running GraphQL server...'))
