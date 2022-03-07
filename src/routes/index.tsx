import * as express from 'express';
const e = require("express");
const router = e.Router();

const Chintai = require('../modules/chintai').default
const chintai = new Chintai()


router.get('/test', (req: express.Request, res: express.Response) => {
    console.log(req)
    res.json('HELLO WOLRD')
})

router.get('/balance', async ( req: express.Request, res: express.Response ) => {
    
    try {
        let balance = await chintai.getBalance()
        res.json({ balance })
    }
    catch(e){
        console.log({e})
    }

})

router.get('/burn/:amountToBurn', async (req: express.Request, res: express.Response) => {

    try {
        let { amountToBurn } = req.params

        let initialBalance = await chintai.getBalance()
    
        let burnStatus = await chintai.burnTokens(parseFloat(amountToBurn))
    
        let finalBalance = await chintai.getBalance()
    
        res.json({
            initialBalance,
            amountToBurn,
            burnStatus,
            finalBalance,
        })
    }
    catch(e){
        console.log({e})
    }

   
})

module.exports = router;