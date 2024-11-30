/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // update collection data
  unmarshal({
    "createRule": "user = @request.auth.id && user = @request.body.user",
    "updateRule": "user = @request.auth.id && user = @request.body.user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // update collection data
  unmarshal({
    "createRule": "user = @request.auth.id",
    "updateRule": "user = @request.auth.id"
  }, collection)

  return app.save(collection)
})
