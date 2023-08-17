const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


  // find all tags
  // be sure to include its associated Product data

router.get('/', async(req, res) => {
  const tags = await Tag.findAll({
  attributes: ['id', 'tag_name'],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
  })
  .then(data => res.json(data))
  .catch((err) => {
    res.json(err);
  });


});

router.get('/:id', async (req, res) => {
  
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
  const singleTag = await Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
  })
  res.status(200).json(singleTag)
  
 } catch (err) {
  res.status(500).json(err)
 }
});

router.post('/', async (req, res) => {
  // create a new tag
  const createTag = await Tag.create(req.body);
  try {
    res.status(200).json(createTag);
  } catch {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
  {
    where: {
      id: req.params.id
      }
  })
  res.status(200).json({ message: 'Tag updated successfully '})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occured while updating the category' })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  try {
    res.status(200).json({ message: 'Tag successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
});

module.exports = router;
