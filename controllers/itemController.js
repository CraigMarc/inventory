const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all Items.


exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name")
    .sort({ name: 1 })
    .exec();
    console.log(allItems)
  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific Item.
/*
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
});*/

exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [item] = await Promise.all([
    Item.findById(req.params.id)
    .populate('category')
    .exec()
  ]);
  console.log(item.name)

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
  res.send("NOT IMPLEMENTED: Item create GET");
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
});

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
  
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED Item update POST");
});