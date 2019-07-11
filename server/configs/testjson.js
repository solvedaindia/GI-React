const testJSON = {
  orderDetails: {
    result: {
      order: {
        invoices: ['31I_1000021421', '31I_1000021422', '31I_1000021423'],
        orderLines: [
          {
            unitPrice: '390.00',

            quantity: '5',

            catentryId: '17508',

            partNumber: '56101515SD00298',

            shipments: [
              {
                statusDate: '2019-07-01T15:27:13+05:30',

                expectedShipmentDate: '2019-07-01T15:26:20+05:30',

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: '2019-07-01T15:26:20+05:30',

                installationDate: null,

                shipmentKey: null,

                shipQty: '1',

                deliveryDate: null,

                shippedDate: null,

                statusCode: '3200.1000',

                status: 'Created',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T09:11:40+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: null,

                shipmentKey: '2019070209113920857652',

                shipQty: '1',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400',

                status: 'Shipped',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T11:35:12+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: '2019-03-08T16:58:31+05:30',

                shipmentKey: '2019070210350920859293',

                shipQty: '1',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400.6000',

                status: 'Delivered',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T11:59:16+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: null,

                shipmentKey: '2019070210361520859304',

                shipQty: '2',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400.7000',

                status: 'Installed',

                packedDate: null,
              },
            ],

            status: 'Partially Installed',
          },
          {
            unitPrice: '390.00',

            quantity: '5',

            catentryId: '17506',

            partNumber: '56101515SD00298',

            shipments: [
              {
                statusDate: '2019-07-01T15:27:13+05:30',

                expectedShipmentDate: '2019-07-01T15:26:20+05:30',

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: '2019-07-01T15:26:20+05:30',

                installationDate: null,

                shipmentKey: null,

                shipQty: '1',

                deliveryDate: null,

                shippedDate: null,

                statusCode: '3200.1000',

                status: 'Created',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T09:11:40+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: null,

                shipmentKey: '2019070209113920857652',

                shipQty: '1',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400',

                status: 'Shipped',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T11:35:12+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: '2019-03-08T16:58:31+05:30',

                shipmentKey: '2019070210350920859293',

                shipQty: '1',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400.6000',

                status: 'Delivered',

                packedDate: null,
              },

              {
                statusDate: '2019-07-02T11:59:16+05:30',

                expectedShipmentDate: null,

                createdDate: '2019-07-01T15:23:12+05:30',

                expectedDeliveryDate: null,

                installationDate: null,

                shipmentKey: '2019070210361520859304',

                shipQty: '2',

                deliveryDate: null,

                shippedDate: '2019-04-26T11:27:24+05:30',

                statusCode: '1400.7000',

                status: 'Installed',

                packedDate: null,
              },
            ],

            status: 'Partially Installed',
          },
        ],

        orderId: '55585418634',

        deliveryAddress: {
          eveningPhone: '',

          zipCode: '600005',

          country: 'IN',

          lastName: 'exports',

          city: 'Chennai',

          jobTitle: '',

          title: '',

          suffix: '',

          eMailID: 'nehadwivedi@gmail.com',

          addressLine1: 'VIKHROLI WEST',

          company: '',

          personID: '',

          addressLine2: 'LAL BAHADUR SHASHTRI MARG',

          addressLine3: 'GODREJ n BOYCE MFG CO LTD',

          state: 'TN',

          department: '',

          addressLine4: '',

          addressLine5: '',

          addressLine6: '',

          eveningFaxNo: '',

          beeper: '',

          addressID: null,

          firstName: 'prime',

          otherPhone: '',

          mobilePhone: '9845854407',

          dayPhone: '',

          dayFaxNo: '',

          alternateEmailID: '',

          middleName: '',
        },

        orderStatus: 'Partially Installed',

        paymentMethod: 'BillDesk',

        orderSummary: {
          couponSavings: null,

          total: null,

          shipping: null,

          godrejCredit: null,

          discount: null,

          subTotal: null,
        },

        orderDate: '2019-07-01T15:23:12+05:30',

        orderTotal: '1950.00',
      },
    },

    Status: 'Success',

    orderId: '55585418634',

    responseFormat: ['json'],

    storeId: '10151',
  },
};
module.exports = testJSON;
