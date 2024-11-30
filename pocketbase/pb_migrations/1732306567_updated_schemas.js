/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // add field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json1766001124",
    "maxSize": 0,
    "name": "site",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // remove field
  collection.fields.removeById("json1766001124")

  return app.save(collection)
})
