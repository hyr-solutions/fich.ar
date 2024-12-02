/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("text544637854")

  // remove field
  collection.fields.removeById("bool1499206091")

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2972241097",
    "max": 0,
    "min": 0,
    "name": "addresses",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text50306159",
    "max": 0,
    "min": 0,
    "name": "webhooks",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "bool2677661594",
    "name": "should_send_mail",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool4152626521",
    "name": "should_call_webhooks",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

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
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "bool1499206091",
    "name": "wants_n8n_forwarding",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
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

  // update field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text50306159",
    "max": 0,
    "min": 0,
    "name": "forward_webhooks",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool2677661594",
    "name": "wants_email_forwarding",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "bool4152626521",
    "name": "wants_webhook_forwarding",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
