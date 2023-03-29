const { Schema, model } = require('mongoose')

var orderSchema = new Schema({
  orderID: {
    type: Schema.Types.String,
    required: [true, 'You must provide a orderID']
  },
  orderDate: {
    type: Schema.Types.String,
  },
  store: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
  },
   phone: {
    type: Schema.Types.String,
  },
  totalItems: {
    type: Schema.Types.String,
  },
  price: {
    type: Schema.Types.String,
  },
  status: {
    type: Schema.Types.String,
  }
})

const Order = model('Order', orderSchema)

module.exports = Order