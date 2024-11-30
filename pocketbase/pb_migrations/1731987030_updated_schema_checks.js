/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json3096330578",
    "maxSize": 0,
    "name": "expected_schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json1642684256",
    "maxSize": 0,
    "name": "actual_schema",
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
    "name": "checked_schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json1642684256",
    "maxSize": 0,
    "name": "current_schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
