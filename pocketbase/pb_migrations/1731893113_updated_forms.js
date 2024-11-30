/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("text3096330578")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // add field
  collection.fields.add(new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3096330578",
    "max": 0,
    "min": 0,
    "name": "schema",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("json3096330578")

  return app.save(collection)
})
