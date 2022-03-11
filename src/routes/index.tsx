import * as express from 'express';
const e = require("express");
const router = e.Router();

const Chintai = require('../modules/chintai').default
const chintai = new Chintai()

// const Email = require('../modules/email').default
// const SgEmail = new Email()
const Email = require('../modules/email').default
const mgEmail = new Email()

router.get('/ping', async ( req: express.Request, res: express.Response ) => {
    
    try {
        console.log("PING SUCCESS")
        res.json({ success: true })

    }
    catch(e){
        console.log("PING FAIL")
        res.status(500).json({ success: false })
    }

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

router.post('/test', async (req: express.Request, res: express.Response) => {

    try {

        const {
         numJCR,
         email,
        } = req.body;

        console.log({
            numJCR,
            email,
        })

        let purchaseSuccessResponse = await mgEmail.sendPurchaseSuccess({
            txnId: 'txnId', 
            numJCR,
            email
        })


        res.json({success: purchaseSuccessResponse})

    }
    catch(e) {
        console.log({e})
        console.log(JSON.stringify(e))
    }

})

router.post('/success', async (req: express.Request, res: express.Response) => {

    try {

        console.log("in shccess")

        const {
         numJCR,
         fee,
         name,
         email,
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

        console.info(`dataDump: numJCR:${numJCR}; fee:${fee}; name:${name}; email:${email}; address_1:${address_1}; address_2:${address_2}; postCode:${postCode}; billingRadio:${billingRadio}; giftName:${giftName}; giftEmail:${giftEmail}; checkout:${checkout}; subscribeCheck:${subscribeCheck}; tncCheck`)

        let purchaseSuccessResponse = await mgEmail.sendPurchaseSuccess({
            txnId: 'txnId', 
            numJCR,
            email
        })

        let sendInfoResponse = await mgEmail.sendInfoToJustCarbon({
            numJCR,
            fee,
            name,
            email,
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

        res.json({
            purchaseSuccessResponse,
            sendInfoResponse,
            success: true
        })

    }
    catch(e) {
        console.log({e})
        console.log(JSON.stringify(e))
        res.json({success: false})
    }

})

module.exports = router:${router};