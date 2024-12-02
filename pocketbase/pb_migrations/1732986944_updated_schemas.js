/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file3277268710",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "thumb",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file3277268710",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "thumbnail",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
