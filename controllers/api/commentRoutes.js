const router = require('express').Router();
const { Comment, User, Bid } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all comments and JOIN with user data
      const commentData = await Comment.findAll({
        include: [{ model: User }, { model: Bid }],
      });
  
      //Serialize data so the template can read it
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     // get current comments
//     const currentComments = await Comment.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const comments = currentComments.get({ plain: true });

//     //serialize data
//     console.log(comments);
//     res.status(200).json(comments);

//     // const postData = await Post.update({
//     //   ...req.body,
//     //   user_id: req.session.user_id,
//     // });

//     // res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;