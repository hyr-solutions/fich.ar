/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "deleteRule": "form.user = @request.auth.id",
    "listRule": "form.user = @request.auth.id",
    "updateRule": "form.user = @request.auth.id",
    "viewRule": "form.user = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": "@request.auth.id = form.user"
  }, collection)

  return app.save(collection)
})
