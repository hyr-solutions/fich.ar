/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_344172009")

  // update collection data
  unmarshal({
    "authAlert": {
      "enabled": false
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_344172009")

  // update collection data
  unmarshal({
    "authAlert": {
      "enabled": true
    }
  }, collection)

  return app.save(collection)
})
