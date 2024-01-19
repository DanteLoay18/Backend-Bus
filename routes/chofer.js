const { Router } = require('express');

const { choferGet,
        choferPost,
        choferPut,
        choferDelete,
        choferGetByID
      } = require('../controllers');




const router = Router();

router.get('/', choferGet);

router.get('/:id', choferGetByID)

router.put('/:id', choferPut);

router.post('/', choferPost);

router.delete('/:id', choferDelete);

module.exports = router;