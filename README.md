# Tarium

## API Documentation

### Get All Items

  Returns JSON of all hardware in the database.

* **URL**

  /api/inventory

* **Method**

  `GET`

* **Success Response**

  * **Code:** 200<br/>
    **Body:** `[ {
      id: 1,
      asset: 05261,
      model: "HP 850 G3",
      serial: "00000000",
      status: "working",
      location: "storage"
    } ]`
