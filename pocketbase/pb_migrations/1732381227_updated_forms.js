/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // update collection data
  unmarshal({
    "updateRule": "user = @request.auth.id && @request.body.user:isset = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // update collection data
  unmarshal({
    "updateRule": "user = @request.auth.id && user = @request.body.user"
  }, collection)

  return app.save(collection)
})
