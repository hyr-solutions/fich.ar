/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update field
  collection.fields.add(new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "url2137122792",
    "name": "schema_check_site",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // update field
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

  // update field
  collection.fields.add(new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "url2137122792",
    "name": "schema_check_site",
    "onlyDomains": [],
    "presentable": false,
    "required": true,
    "system": false,
    "type": "url"
  }))

  // update field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json1766001124",
    "maxSize": 0,
    "name": "site",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
