/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "name": "schema_checks"
  }, collection)

  // add field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "json1642684256",
    "maxSize": 0,
    "name": "present_schema",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.add(new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "url2137122792",
    "name": "schema_check_url",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_2357651270")

  // update collection data
  unmarshal({
    "name": "verifications"
  }, collection)

  // remove field
  collection.fields.removeById("json1642684256")

  // update field
  collection.fields.add(new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "url2137122792",
    "name": "verification_url",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
})
