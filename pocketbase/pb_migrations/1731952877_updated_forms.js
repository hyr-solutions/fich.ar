/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // add field
  collection.fields.add(new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1627692185",
    "max": 0,
    "min": 0,
    "name": "captcha_secret",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("text1627692185")

  return app.save(collection)
})
