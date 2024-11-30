/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json3096330578",
    "maxSize": 0,
    "name": "schema_to_verify",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json3096330578",
    "maxSize": 0,
    "name": "schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
