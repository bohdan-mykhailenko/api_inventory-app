# Inventory API

## Description

This repository contains the source code for the Inventory-API project, which serves as the backend for the inventory application. The API is based on **_Node.js_**, **_Express.js_** and **_Socket.io_**, and it interacts with a **_PostgreSQL_** database using the **_Sequelize ORM_**.

## Features

**The API provides the following features:**

- **Get Data:** Get orders and products with certain criteria.
- **Post Data:** Create a new order or product.
- **Delete Data**: Delete any required order or product.
- **Count Active Sessions:** Using the web-socket server the app count sessions.

**Additional features:**

- **Image Upload:** Store image files and use the static feature.
- **Filtering:** Filtering products and orders by query or type(for products).

## Technologies

- TypeScript
- Node.js
- Express
- Socket.io
- Sequelize
- PostgreSQL
- Multer

## Getting Started

To get started with the Online-Store-API, follow these steps:

1. Clone the repository:

```shell
https://github.com/<your-username>/inventory-backend.git
```

2. Install dependencies:

```shell
npm install
```

3. Set up PostgreSQL Database:
 - Open the **database/config.ts** file and add your PostgreSQL database configuration.

```
export const config = {
  DB_HOST: 'host',
  DB_NAME: 'name',
  DB_USERNAME: 'username',
  DB_PASSWORD: 'password',
};
```

4. Run migrates:

```shell
npm run migrate
```

5. Run seeds:

```shell
npm run seeds
```

6. Start the server:

```shell
npm run dev
```


## Endpoints

The base URL for the API is: **https://inventory-backend-production-324c.up.railway.app**

<table>
    <tr>
        <th>
        	Method
        </th>
        <th>
        	Endpoint
        </th>
        <th>
        	Description
        </th>
        <th>
        	Body
        </th>
    </tr>
    	<tr>
        <th colspan="4">Products</th>
    	</tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        		/products/:productId
        </td>
        <td>
        	Get product with certain id.
        </td>
        <td>
        	NULL
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        		/products?query=query&type=type
        </td>
        <td>
        	Get all products with filtering by query and type
        </td>
        <td>
        	NULL
        </td>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        	/products/order/orderId
        </td>
        <td>
        	Get all products for certain order.
        </td>
        <td>
        	NULL
        </td>
    </tr>
    <tr>
        <td>
        	POST
        </td>
        <td>
          /products
        </td>
        <td>
        	Create new product with all required fields connected to existed order.
        </td>
        <td>
<pre>
{
 serialNumber: string,
 isNew: boolean,
 isRepairing: boolean,
 photo: Blob,
 title: string,
 type: string,
 specification: string,
 guarantee: JSON.Stringify({
   start: string,
   end: string,
 }),
 price: JSON.Stringify({
   value: number,
   symbol: string,
   isDefault: number,
  },
  {
   value: number,
   symbol: string,
   isDefault: number,
 });
 date: string,
}
<pre>
        </td>
    </tr>
    <tr>
        <td>
        	DELETE
        </td>
        <td>
        	/products/:productId
        </td>
        <td>
        	Delete product with certain id.
        </td>
        <td>
        	NULL
        </td>
    </tr>
    <tr>
        <th colspan="4">Orders</th>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        		/orders/:orderId
        </td>
        <td>
        	Get orderwith certain id.
        </td>
        <td>
        	NULL
        </td>
    </tr>
<tr>
        <td>
        	GET
        </td>
        <td>
        	/orders?query=query
        </td>
        <td>
        	Get all orders filtering by query.
        </td>
        <td>
        	NULL
        </td>
    </tr>
    <tr>
        <td>
        	POST
        </td>
        <td>
        	/orders
        </td>
        <td>
        	Create new order with all required fields.
        </td>
        <td>
        	<pre>
{
 title: string,
 date: string,
 description: string,
}
       </pre>
        </td>
    </tr>
    <tr>
        <td>
        	DELETE
        </td>
        <td>
        	/orders/:orderId
        </td>
        <td>
        	Delete order with certain id and all connected products.
        </td>
        <td>
        	NULL
        </td>
    </tr>
</table>
