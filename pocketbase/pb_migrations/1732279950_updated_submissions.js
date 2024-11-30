/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool1301041197",
    "name": "is_dev",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool1301041197",
    "name": "is_test",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
