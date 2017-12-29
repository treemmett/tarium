# Tarium

## API Documentation

* [Get Item](#get-item)
* [Get All Items](#get-all-items)
* [Add New Items](#add-new-items)
* [Update Item](#update-item)
* [Assign Item](#assign-item)

### Get Item

  Returns JSON of specific item in inventory.

  * **URL**

    /api/inventory/:asset

  * **Method**

    `GET`

  * **URL Params**

    * `asset` Asset tag

  * **Success Response**

    * **Code:** 200<br/>
    **Body:** `{
      "asset": 50848948,
      "model": "HP 85555 G3",
      "serial": "02544981SE6",
      "os": "Windows 10 Professional",
      "status": "working",
      "location": "storage"
  }`

  * **Error Response**

    * **Code:** 404<br/>
    **Body:** `{"error": "Asset tag not found"}`

### Get All Items

  Returns JSON of all items in the inventory.

  * **URL**

    /api/inventory

  * **Method**

    `GET`

  * **Success Response**

    * **Code:** 200<br/>
      **Body:** `[{
      "asset": 50848948,
      "model": "HP 85555 G3",
      "serial": "02544981SE6",
      "os": "Windows 10 Professional",
      "status": "working",
      "location": "storage"
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
    **Body:** `{"success": true}`

  * **Error Response**

    * **Code:** 422<br/>
    **Body:** `{"error": "Missing required data"}`

    OR

    * **Code:** 500<br/>
    **Body:** `{"error": "Database query failed"}`

### Update Item

  Updates values of existing item

  * **URL**

    /api/inventory/:asset

  * **Method**

    `PUT`

  * **URL Params**

    * `asset` Asset tag

  * **Data Params**

    **At Least One Required:**

    * `location` Physical location
    * `model` Model number
    * `os` Operating system
    * `serial` Serial number
    * `status` Working condition

  * **Success Response**

    A successful update will return the new values of the item.

      * **Code:** 200<br/>
        **Body:** `{
        "asset": 50848948,
        "model": "HP 85555 G3",
        "serial": "02544981SE6",
        "os": "Windows 10 Professional",
        "status": "working",
        "location": "storage"
    }`

  * **Error Response**

    * **Code:** 404<br/>
    **Body:** `{"error": "Asset tag not found"}`

    OR

    * **Code:** 422<br/>
    **Body:** `{"error": "At least one parameter required to update"}`

### Assign Item

Assigns an item to a specific user

  * **URL**

    /api/assign

  * **Method**

    `POST`

  * **Data Params**

    **Required:**

      * `asset` Asset tag
      * `assignee` Assigned user of item

    **Optional:**

      * `expectedReturn` Unix epoch of item's expected return date _*[number]*_

  * **Success Response**

    * **Code:** 200<br/>
    **Body:** `{"success": true}`

  * **Error Response**

    * **Code:** 422<br/>
    **Body:** `{"error": "Missing required data"}`

    OR

    * **Code:** 400<br/>
    **Body:** `{"error": "Incorrect data type. expectedReturn expects a number"}`

    OR

    * **Code:** 500<br/>
    **Body:** `{"error": "Database query failed"}`
