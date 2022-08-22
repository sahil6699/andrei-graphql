const express = require("express")
const {buildSchema }= require("graphql")
const {graphqlHTTP} = require("express-graphql")


const schema = buildSchema(`
	type Query {
		products: [Product]
		order: [Order]
	}

	type Product {
		id: ID!
		description: String!
		reviews: [Review]
		price: Float!
	}

	type Review {
		rating: Int!
		comment: String
	}

	type Order {
		date: String
		subtotal: Float!
		item: [OrderItem]
	}

	type OrderItem {
		price: Product!
		quatity: Int!
	} 
`)


const root = {
	description: "Red Shoe",
	price: 42.12
}

const app = express()

app.use('/graphql',graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))



app.listen(3000, () => {
	console.log("Running our graphql server")
})