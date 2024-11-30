/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2972241097",
    "max": 0,
    "min": 0,
    "name": "forward_addresses",
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
    "id": "text50306159",
    "max": 0,
    "min": 0,
    "name": "forward_endpoints",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text544637854",
    "max": 0,
    "min": 0,
    "name": "forward_n8n_endpoints",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool2677661594",
    "name": "is_email_forwarding_enabled",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "bool4152626521",
    "name": "is_webhook_forwarding_enabled",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "bool1499206091",
    "name": "is_n8n_forwarding_enabled",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("text2972241097")

  // remove field
  collection.fields.removeById("text50306159")

  // remove field
  collection.fields.removeById("text544637854")

  // remove field
  collection.fields.removeById("bool2677661594")

  // remove field
  collection.fields.removeById("bool4152626521")

  // remove field
  collection.fields.removeById("bool1499206091")

  return app.save(collection)
})
