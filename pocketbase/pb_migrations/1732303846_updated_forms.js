/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("json3096330578")

  // add field
  collection.fields.add(new Field({
    "cascadeDelete": false,
    "collectionId": "_pbc_2357651270",
    "hidden": false,
    "id": "relation3096330578",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

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

  // remove field
  collection.fields.removeById("relation3096330578")

  return app.save(collection)
})
