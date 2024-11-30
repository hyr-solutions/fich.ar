/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "file104153177",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "files",
    "presentable": false,
    "protected": true,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_1063348727")

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "file104153177",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "files",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
