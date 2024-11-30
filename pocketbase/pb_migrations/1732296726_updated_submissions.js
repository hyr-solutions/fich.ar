/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // add field
  collection.fields.add(new Field({
    "cascadeDelete": true,
    "collectionId": "_pbc_2357651270",
    "hidden": false,
    "id": "relation3096330578",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "schema",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // remove field
  collection.fields.removeById("relation3096330578")

  return app.save(collection)
})
