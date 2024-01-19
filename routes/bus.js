const {Router} = require('express');

const { busGet,
        busPut,
        busGetId, 
        busPost, 
        busDelete,
        busDeleteAsientos
         } = require('../controllers');

    


const router= Router();

router.get('/:id',busGetId);

router.get('/', busGet);

router.put('/:id', busPut);

router.post('/', busPost );

router.delete('/:id', busDelete  );

router.delete('/:id/asientos', busDeleteAsientos);

module.exports = router;