const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//homepage
exports.index = asyncHandler(async (req, res, next) => {
  
  res.render("index", {
    title: "Bike Shop Inventory Home",
    
  });
});

// Display list of all Categories.

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .populate("description")
    .exec();
  res.render("category_list", { title: "Category List", category_list: allCategories });
});

// Display detail page for a specific Category.

exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of category and all their items (in parallel)
  const [category, allCategoryItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }
 
  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    category_items: allCategoryItems,
  });
});


// Display Category create form on GET.

  exports.category_create_get = (req, res, next) => {
    res.render("category_form", { title: "Create Category" });
  };



// Handle Category create on POST.


exports.category_create_post = [
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

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const categoryExists = await Category.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to category detail page.
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET.

// Display Author delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  // Get category and all their items (in parallel)
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (category === null) {
    // No results.
    res.redirect("/home/category");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    category_items: allItemsInCategory,
  });
});

// Handle Category delete on POST.

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  // Get category and all their items (in parallel)
  
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name description").exec(),
  ]);

 

  if (allItemsInCategory.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      category_items: allItemsInCategory,
    });
    return;
  } else {
    // Category has no items Delete object 
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/home/category");
  }
});

// Display Category update form on GET.

exports.category_update_get = asyncHandler(async (req, res, next) => {
  // Get details of category and all their items (in parallel)
  
  const category = await Category.findById(req.params.id)
    .exec();

  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
    
    
  });
});

// Handle Category update on POST.


exports.category_update_post = [
  

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

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });


    if (!errors.isEmpty()) {
     
      const category = await Category.findById(req.params.id)
    .exec();

      
    res.render("category_form", {
      title: "Update Category",
      category: category,
      errors: errors.array()
      
    });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedCatagory = await Category.findByIdAndUpdate(req.params.id, category, {});
      // Redirect to category detail page.
      res.redirect(updatedCatagory.url);
    }
  }),
];
