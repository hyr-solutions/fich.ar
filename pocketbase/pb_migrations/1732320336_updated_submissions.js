/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "updateRule": "form.user = @request.auth.id"
  }, collection)

  // add field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool2287856061",
    "name": "hidden",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update collection data
  unmarshal({
    "updateRule": null
  }, collection)

  // remove field
  collection.fields.removeById("bool2287856061")

  return app.save(collection)
})
