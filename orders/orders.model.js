const orders = [
  {
    date: '2005-05-05',
    subtotal: 90.22,
    items: [
      {
        product: {
          id: 'redshow',
          description: 'Old Red Shoe',
          price: 45.99,
        },
        quantity: 6,
      },
    ],
  },
]

const getAllOrders = () => {
  return orders
}

module.exports = {
  getAllOrders,
}
