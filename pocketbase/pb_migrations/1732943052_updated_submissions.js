/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": true,
    "id": "bool3625215074",
    "name": "is_hidden",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // remove field
  collection.fields.removeById("bool3625215074")

  return app.save(collection)
})
