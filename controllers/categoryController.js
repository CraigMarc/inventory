const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");


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
/*
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
});*/

exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
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
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle Category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create POST");
});

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
  
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update GET");
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED Category update POST");
});
