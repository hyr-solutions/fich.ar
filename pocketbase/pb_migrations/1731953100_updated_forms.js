/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // add field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "select1176948197",
    "maxSelect": 1,
    "name": "captcha_provider",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "turnstile",
      "recaptcha",
      "hcaptcha"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("select1176948197")

  return app.save(collection)
})
