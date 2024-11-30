/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
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

  // update field
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
})
