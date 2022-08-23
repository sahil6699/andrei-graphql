const path = require('path')
const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const { loadFileSync } = require('@graphql-tools/load-files')
const makeExecutableSchema = require('@graphql-tools/schema')

const typesArray = loadFileSync(path.join(__dirname, '**/*.graphql'))

const schemaText = `type Query {
		products: [Product]
		orders: [Order]
	}
`

const schema = makeExecutableSchema({
  typeDefs: typesArray,
})

const root = {
  products: [
    {
      id: 'redshoe',
      description: 'Red Shoe',
      price: 42.12,
    },
    {
      id: 'bluejean',
      description: 'Blue Jeans',
      price: 55.55,
    },
  ],
  orders: [
    {
      date: '2005-05-05',
      subtotal: 90.22,
      items: [
        {
          product: {
            id: 'redshoe',
            description: 'Old Red Shoe',
            price: 45.11,
          },
          quantity: 2,
        },
      ],
    },
  ],
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
