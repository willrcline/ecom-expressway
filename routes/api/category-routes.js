const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  // find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {model: Product}
      ]
    })
    if (!categories) {
      res.status(404).json("Couldn't find results for Category")
      return
    }
    res.status(200).json(categories)
    return
  } catch (err) {
    res.status(500)
    return
  }
})  

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      var category = await Category.findByPk(req.params.id, {
        include: [
          {model: Product}
        ]
      })
      if (!category) {
        res.status(404).json("No category found")
        return
      }
      res.status(200).json(category)
      return
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  res.status(200).json({ message: 'Create successful' });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: 'delete successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while trying to update the category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ message: 'delete successful' });
});

module.exports = router;
