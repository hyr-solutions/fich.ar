/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "listRule": "form.user = @request.auth.id && is_hidden = false",
    "viewRule": "form.user = @request.auth.id && is_hidden = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "listRule": "form.user = @request.auth.id",
    "viewRule": "form.user = @request.auth.id"
  }, collection)

  return app.save(collection)
})
