const router = require('express').Router();
const { json } = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allProducts = await Category.findAll(
      {
        include: [{ model: Product }],
      }
    );
    res.status(200).json(allProducts)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  }).then(oneCategory => res.json(oneCategory)).catch(err => res.json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(newCategory => res.json(newCategory)).catch(err => res.json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then(updatedCategory => res.json(updatedCategory)).catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then(deletedCat => res.json(deletedCat))
    .catch(err => res.json(err))
});

module.exports = router;
