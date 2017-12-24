# Tarium

## API Documentation

### Get All Items

  Returns JSON of all items in the inventory.

* **URL**

  /api/inventory

* **Method**

  `GET`

* **Success Response**

  * **Code:** 200<br/>
    **Body:** `[{
      id: 1,
      asset: 05261,
      model: "HP 850 G3",
      serial: "00000000",
      status: "working",
      location: "storage"
    }]`

### Add New Items

  Adds a new item to the inventory.

* **URL**

  /api/inventory

* **Method**

  `POST`

* **Data Params**

  **Required:**

  * `asset` Asset tag
  * `model` Model number
  * `serial` Serial number

  **Optional:**

  * `location` Physical location _(default - storage)_
  * `os` Operating system
  * `status` Working condition _(default - working)_

* **Success Response**

  * **Code:** 200<br/>
  **Body:** `{success: true}`

* **Error Response**

  * **Code:** 422<br/>
  **Body:** `{error: 'Missing required data'}`

  OR

  * **Code:** 500<br/>
  **Body:** `{error: 'Database query failed'}`
