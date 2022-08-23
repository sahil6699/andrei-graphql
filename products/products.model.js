const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 42.99,
  },
  {
    id: 'bluejean',
    description: 'Blue Jeans',
    price: 59.99,
  },
]

const getAllProducts = () => {
  return products
}

module.exports = {
  getAllProducts,
}
