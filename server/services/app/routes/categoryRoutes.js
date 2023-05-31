const CategoryController = require('../controllers/categoryController');

const router = require('express').Router();

router.get('/', CategoryController.categories);

router.get('/:id', CategoryController.categoriesWithPosts);

router.post('/', CategoryController.newCategory);

router.put('/:id', CategoryController.editCategory);

router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
