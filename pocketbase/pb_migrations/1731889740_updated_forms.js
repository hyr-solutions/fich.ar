/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // remove field
  collection.fields.removeById("url714356641")

  // add field
  collection.fields.add(new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url4135058147",
    "name": "verification_site",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pbc_4248771575")

  // add field
  collection.fields.add(new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url714356641",
    "name": "urls",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // remove field
  collection.fields.removeById("url4135058147")

  return app.save(collection)
})
