const path = require('path')
const express = require('express')

// const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))

// const schemaText = `type Query {
// 		products: [Product]
// 		orders: [Order]
// 	}
// `

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: {
    Query: {
      products: async (parent) => {
        console.log('Getting the products...')
        const product = await Promise.resolve(parent.products)
        return product
      },
      orders: async (parent) => {
        console.log('Getting the orders....')
        const order = await Promise.resolve(parent.orders)
        return order
      },
    },
  },
})

const root = {
  products: require('./products/products.model.js'),
  orders: require('./orders/orders.model.js'),
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(3000, () => {
  console.log('Running our graphql server')
})
