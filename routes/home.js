const express = require("express");
const router = express.Router();

// Require controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");
//const genre_controller = require("../controllers/genreController");
//const category_instance_controller = require("../controllers/categoryinstanceController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", category_controller.index);

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get("/category/create", category_controller.category_create_get);

// POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Category items.
router.get("/category", category_controller.category_list);

/// AUTHOR ROUTES ///

// GET request for creating Item. NOTE This must come before route for id (i.e. display item).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Item.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete Item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one Item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all Items.
router.get("/items", item_controller.item_list);
/*
/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/categoryinstance/create",
  category_instance_controller.categoryinstance_create_get,
);

// POST request for creating BookInstance.
router.post(
  "/categoryinstance/create",
  category_instance_controller.categoryinstance_create_post,
);

// GET request to delete BookInstance.
router.get(
  "/categoryinstance/:id/delete",
  category_instance_controller.categoryinstance_delete_get,
);

// POST request to delete BookInstance.
router.post(
  "/categoryinstance/:id/delete",
  category_instance_controller.categoryinstance_delete_post,
);

// GET request to update BookInstance.
router.get(
  "/categoryinstance/:id/update",
  category_instance_controller.categoryinstance_update_get,
);

// POST request to update BookInstance.
router.post(
  "/categoryinstance/:id/update",
  category_instance_controller.categoryinstance_update_post,
);

// GET request for one BookInstance.
router.get("/categoryinstance/:id", category_instance_controller.categoryinstance_detail);

// GET request for list of all BookInstance.
router.get("/categoryinstances", category_instance_controller.categoryinstance_list);
*/
module.exports = router;