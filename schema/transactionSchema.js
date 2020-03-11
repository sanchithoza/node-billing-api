var addTransactionSchema = {
    body: {
        type: "array",
        items: [{
            type: 'object',
            required: ['transactionDate', 'transactionType', 'transactionMode', 'personId', 'userId'],
            properties: {
                transactionDate: { type: 'string' },
                transactionType: { type: 'string' },
                transactionMode: { type: 'string' },
                personId: { type: 'number' },
                userId: { type: 'number' },
            }
        }, {
            type: 'object',
            required: ['detail'],
            properties: {
                detail: {
                    type: 'array',
                    minItems: 1,
                    items: [{
                        type: 'object',
                        required: ['productId', 'qty', 'unit', 'taxablePrice'],
                        properties: {
                            productId: { type: 'number' },
                            qty: { type: 'number' },
                            unit: { type: 'string' },
                            taxablePrice: { type: 'number' },
                            gstRate: { type: 'number' },
                            gstAmount: { type: 'number' },
                            amount: { type: 'number' }
                        }
                    }]
                }
            }

        }]
    }
}

module.exports = {
    addTransactionSchema
}