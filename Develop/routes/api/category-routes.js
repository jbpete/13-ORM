const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
  const allCategories = await Category.findAll({
  attributes: ['id', 'category_name'],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
})
  res.status(200).json(allCategories)
} catch (err) {
  res.status(500).json(err);
}
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const singleCategory = await Category.findOne({
    where: {
      id: req.params.id 
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
  })
  res.status(200).json(singleCategory)
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  const createCategory = await Category.create(req.body);
  try {
    res.status(200).json(createCategory);
  } catch {
    console.log(err);
    res.status(400).json(err);
  }
})



router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
  const updateCategory = await Category.update(
  {
    category_name: req.body.category_name    
  },
  {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ message: 'Category updated successfully' })
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred while updating the category' });
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  try {
    res.status(200).json({ message: 'Category successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
});

module.exports = router;
