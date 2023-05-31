const { Post, Category, Tag, sequelize } = require('../models');

class CategoryController {
  static async categories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async categoriesWithPosts(req, res, next) {
    try {
      const { id } = req.params;
      const categories = await Category.findOne({
        where: { id },
        include: {
          model: Post,
          include: [
            { model: Tag, as: 'tags' },
          ],
        },
      });

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async newCategory(req, res, next) {
    const { name } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const category = await Category.create({ name });

      await transaction.commit();
      res.status(201).json(category);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    const { name } = req.body;
    const { id } = req.params;
    const transaction = await sequelize.transaction();

    try {
      await Category.update({ name }, { where: { id }, transaction });
      await transaction.commit();

      res.status(200).json({ message: 'Success edit category' });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      await Category.destroy({ where: { id } });

      res.status(200).json({ message: 'Success delete category' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
