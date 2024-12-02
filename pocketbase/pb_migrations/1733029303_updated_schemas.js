/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // remove field
  collection.fields.removeById("json1766001124")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1872607463",
    "max": 0,
    "min": 0,
    "name": "banner",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2229311990",
    "max": 0,
    "min": 0,
    "name": "favicon",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3412486284",
    "max": 0,
    "min": 0,
    "name": "iframe_src",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1542800728",
    "max": 0,
    "min": 0,
    "name": "field",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4016875630",
    "max": 0,
    "min": 0,
    "name": "site_title",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json1642684256",
    "maxSize": 0,
    "name": "fields",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "json1766001124",
    "maxSize": 0,
    "name": "site",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("text1872607463")

  // remove field
  collection.fields.removeById("text2229311990")

  // remove field
  collection.fields.removeById("text3412486284")

  // remove field
  collection.fields.removeById("text1542800728")

  // remove field
  collection.fields.removeById("text4016875630")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json1642684256",
    "maxSize": 0,
    "name": "json",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
