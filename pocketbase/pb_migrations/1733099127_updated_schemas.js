/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // remove field
  collection.fields.removeById("file3277268710")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // add field
  collection.fields.addAt(4, new Field({
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
})
