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
         name,
        } = req.body;

        console.log({
            numJCR,
            email,
        })

        let purchaseSuccessResponse = await mgEmail.sendPurchaseSuccessTemplate({
            txnId: 'txnId', 
            numJCR,
            email,
            name
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

        const {
         numJCR,
         fee,
         name,
         email,
         address_1,
         address_2,
         postCode,
         billingaddress,
         subscribe,
         termsandconditions,
         GIFT_name,
         GIFT_email,
         GIFT_address_1,
         GIFT_address_2,
         GIFT_postCode,
         giftAddress,
        } = req.body;

        const uid = Date.now().toString()

        console.info(`dataDump: uid: ${uid} numJCR:${numJCR}; fee:${fee}; name:${name}; email:${email}; address_1:${address_1}; address_2:${address_2}; postCode:${postCode}; billingaddress:${billingaddress}; subscribe:${subscribe}; termsandconditions:${termsandconditions}`)

        let purchaseSuccessResponse = await mgEmail.sendPurchaseSuccessTemplate({
            txnId: 'txnId', 
            numJCR,
            email,
            name
        })

        let sendInfoResponse = await mgEmail.sendInfoToJustCarbon({
            numJCR,
            fee,
            name,
            email,
            address_1,
            address_2,
            postCode,
            billingaddress,
            subscribe,
            termsandconditions,
            GIFT_name,
            GIFT_email,
            GIFT_address_1,
            GIFT_address_2,
            GIFT_postCode,
            giftAddress,
        })

        console.info(`dataDump: uid: ${uid} numJCR:${numJCR}; fee:${fee}; name:${name}; email:${email}; address_1:${address_1}; address_2:${address_2}; 
        postCode:${postCode}; billingaddress:${billingaddress}; subscribe:${subscribe}; termsandconditions:${termsandconditions}; 
        purchaseSuccessResponse: ${purchaseSuccessResponse}; sendInfoResponse:${sendInfoResponse}; GIFT_name:${GIFT_name}, GIFT_email: ${GIFT_email};
        GIFT_address_1: ${GIFT_address_1}; GIFT_address_2: ${GIFT_address_2}; GIFT_postCode:${GIFT_postCode}; giftAddress: ${giftAddress}
        `)

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


router.post('/contact', async (req: express.Request, res: express.Response) => {

    try {

        const { 
            name,
            email,
            details
        } = req.body

        console.info(`contactDump: name: ${name}; email: ${email}; details: ${details}`)

        let contactResponse = await mgEmail.sendContact({
            name,
            email,
            details
        })

        res.status(200).json({
            success: true,
            contactResponse
        })

    }
    catch(e) {
        console.log({e})
        console.log(JSON.stringify(e))
        res.json({success: false})
    }
})

router.post('/project-developer', async (req: express.Request, res: express.Response) => {

    try {

        const { 
			types,
            name,
			volume,
			walletnumber,
			tnc,
            registerNumber,
            registerLink,
        } = req.body

        console.info(`developerDump: types: ${types}; name: ${name}; volume: ${volume}; walletnumber: ${walletnumber}; tnc: ${tnc}; registerNumber: ${registerNumber}; registerLink: ${registerLink}`)

        let contactResponse = await mgEmail.sendDeveloper({
			types,
            name,
			volume,
			walletnumber,
			tnc,
            registerNumber,
            registerLink,
        })

        res.status(200).json({
            success: true,
            contactResponse
        })

    }
    catch(e) {
        console.log({e})
        console.log(JSON.stringify(e))
        res.json({success: false})
    }
})

module.exports = router;