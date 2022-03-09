import * as express from 'express';
const e = require("express");
const router = e.Router();

const Chintai = require('../modules/chintai').default
const chintai = new Chintai()

const Email = require('../modules/email').default
const email = new Email()


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

router.post('/success', async (req: express.Request, res: express.Response) => {

    console.log({req})

    try {

        const {
         numJCR,
         name,
         email1,
         address_1,
         address_2,
         postCode,
         billingRadio,
         giftName,
         giftEmail,
         checkout,
         subscribeCheck,
         tncCheck
        } = req.body;

        await email.sendPurchaseSuccess({
            txnId: 'txnId', 
            numJCR,
            email1
        })

        await email.sendInfoToJustCarbon({
            numJCR,
            name,
            email1,
            address_1,
            address_2,
            postCode,
            billingRadio,
            giftName,
            giftEmail,
            subscribeCheck,
            tncCheck,
            checkout,
        })

        res.json({success: true})

    }
    catch(e) {
        console.log({e})
        console.log(JSON.stringify(e))
    }

})

module.exports = router;