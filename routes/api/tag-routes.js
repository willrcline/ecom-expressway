const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {model: Product}
      ]
    })
    if (!tags) {
      res.status(404).json("Couldn't find results for Tag")
      return
    }
    res.status(200).json(tags)
    return
  } catch (err) {
    res.status(500)
    return
  }
})  



  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    var tag = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    })
    if (!tag) {
      res.status(404).json("No tag found")
      return
    }
    res.status(200).json(tag)
    return
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  res.status(200).json({ message: 'Create successful' });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ message: 'update successful' });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({ message: 'delete successful' });
});

module.exports = router;
