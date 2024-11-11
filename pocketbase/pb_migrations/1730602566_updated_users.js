/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_344172009")

  // update collection data
  unmarshal({
    "oauth2": {
      "mappedFields": {
        "username": "name"
      }
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_344172009")

  // update collection data
  unmarshal({
    "oauth2": {
      "mappedFields": {
        "username": ""
      }
    }
  }, collection)

  return app.save(collection)
})
