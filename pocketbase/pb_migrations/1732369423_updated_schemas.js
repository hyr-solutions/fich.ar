/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "createRule": "form.user = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "createRule": null
  }, collection)

  return app.save(collection)
})
