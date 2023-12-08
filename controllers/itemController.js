const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
// Display list of all Items.


exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name")
    .sort({ name: 1 })
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific Item.

exports.item_detail = asyncHandler(async (req, res, next) => {

  // Get details of items

  const item = await Item.findById(req.params.id)
    .populate('category')


  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: "Item Detail",
    item: item,

  });
});

// Display Item create form on GET.

exports.item_create_get = asyncHandler(async (req, res, next) => {

  const allCategories = await Category.find()
    .sort({ name: 1 })
    .exec();



  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,

  });
});

// Handle Item create on POST.


exports.item_create_post = [
  // Validate and sanitize the name field.

  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified.")
    .isAlphanumeric()
    .withMessage("Category name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Price must be specified.")
    .isFloat({ min: 1 })
    .withMessage("Price must be a number."),
  body("number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Number must be specified.")
    .isFloat({ min: 1 })
    .withMessage("Number must be a number."),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category must be specified.")
    .isAlphanumeric()
    .withMessage("Category has non-alphanumeric characters."),


  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a item object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number: req.body.number,
      category: req.body.category

    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.

      const allCategories = await Category.find()
        .sort({ name: 1 })
        .exec();

      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: allCategories,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Item with same name already exists.
      const itemExists = await Item.findOne({ name: req.body.name }).exec();
      if (itemExists) {
        // itew exists, redirect to its detail page.
        res.redirect(itemExists.url);
      } else {
        await item.save();
        // New item saved. Redirect to item detail page.
        res.redirect(item.url);
      }
    }
  }),
];


// Display Item delete form on GET.


exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("category")
    .exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_delete", {
    title: "Item:",
    item: item,
  });
});

// Handle Item delete on POST.


exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("category")
    .exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }


  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/home/items");

});

// Display Item update form on GET.


exports.item_update_get = asyncHandler(async (req, res, next) => {
  // Get details of category and all their items (in parallel)
  
  const item = await Item.findById(req.params.id)
    .populate("category")
    .exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  const allCategories = await Category.find()
    .sort({ name: 1 })
    .exec();


  res.render("item_form", {
    title: "Update Item",
    categories: allCategories,
    item: item
  });
});


// Handle Item update on POST.


exports.item_update_post = [
  

  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified.")
    .isAlphanumeric()
    .withMessage("Category name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Price must be specified.")
    .isFloat({ min: 1 })
    .withMessage("Price must be a number."),
  body("number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Number must be specified.")
    .isFloat({ min: 1 })
    .withMessage("Number must be a number."),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category must be specified.")
    .isAlphanumeric()
    .withMessage("Category has non-alphanumeric characters."),



  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number: req.body.number,
      category: req.body.category,
      _id: req.params.id
    });


    if (!errors.isEmpty()) {
     
      const allCategories = await Category.find()
      .sort({ name: 1 })
      .exec();

    res.render("item_form", {
      title: "Update Item",
      item: item,
      categories: allCategories,
      errors: errors.array(),
    });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      // Redirect to category detail page.
      res.redirect(updatedItem.url);
    }
  }),
];
