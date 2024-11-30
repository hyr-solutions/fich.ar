/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "deleteRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "deleteRule": "form.user = @request.auth.id"
  }, collection)

  return app.save(collection)
})
