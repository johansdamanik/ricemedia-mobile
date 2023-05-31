const { Post, Category, Tag, sequelize } = require('../models');

class PostController {
  static async posts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [{ model: Category }, { model: Tag, as: 'tags' }],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async postDetail(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id, {
        include: [{ model: Category }, { model: Tag, as: 'tags' }],
      });
      if (!post) throw { name: '!post' };

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async newPost(req, res, next) {
    const { title, content, imgUrl, categoryId, tags, userMongoId } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const post = await Post.create({ title, content, imgUrl, categoryId, userMongoId }, { transaction });

      if (tags.length === 0) throw { name: '!tags' };

      const formattedTags = tags.map((tag) => ({ name: tag.name, postId: post.id }));

      await Tag.bulkCreate(formattedTags, { transaction });

      await transaction.commit();
      res.status(201).json(post);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async editPost(req, res, next) {
    const { id } = req.params;
    const { title, content, imgUrl, categoryId, tags } = req.body;

    console.log(tags)

    const transaction = await sequelize.transaction();

    try {
      await Post.update({ title, content, imgUrl, categoryId }, { where: { id }, transaction });

      if (tags.length === 0) throw { name: '!tags' };

      await Tag.destroy({ where: { postId: id }, transaction });

      const formattedTags = tags.map((tag) => ({ name: tag.name, postId: id }));

      await Tag.bulkCreate(formattedTags, { transaction });

      await transaction.commit();

      res.status(200).json({ message: 'Success update post' });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    const { id } = req.params;
    try {
      await Post.destroy({ where: { id } });

      res.status(200).json({ message: 'Success delete post' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
