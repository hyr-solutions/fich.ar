/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_464380059")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pbc_4248771575",
    "hidden": false,
    "id": "relation1384709455",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "form",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_464380059")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "_pbc_4248771575",
    "hidden": false,
    "id": "relation1384709455",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "form",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})