export default {
    name: 'order',
    type: 'document',
    title: 'Orders',
    fields: [
        { name: 'fullName', type: 'string', title: 'Full Name' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'address', type: 'string', title: 'Shipping Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'phone', type: 'string', title: 'Phone Number' },
        {
            name: 'cartItems',
            type: 'array',
            title: 'Cart Items',
            of: [{
                type: 'object',
                fields: [
                    { name: 'productName', type: 'string', title: 'Product Name' },
                    { name: 'quantity', type: 'number', title: 'Quantity' },
                    { name: 'price', type: 'number', title: 'Price' }
                ]
            }]
        },
        { name: 'totalAmount', type: 'number', title: 'Total Amount' },
        {
            name: 'status',
            type: 'string',
            title: 'Order Status',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                ],
            },
            initialValue: 'pending'
        },
        { name: 'orderDate', type: 'datetime', title: 'Order Date', initialValue: (new Date()).toISOString() }
    ]
}