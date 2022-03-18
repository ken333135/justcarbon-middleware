const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api', 
    key: process.env.MAILGUN_API_KEY, 
    url: 'https://api.eu.mailgun.net'
});

const FROM_ADDRESS = `offset@${process.env.MAILGUN_DOMAIN}`
const JUST_CARBON_EMAIL = `offset@${process.env.MAILGUN_DOMAIN}`
// const JUST_CARBON_EMAIL = `ken333136@gmail.com`

/* Sanity check if environment variables are set */
if (!process.env.MAILGUN_API_KEY) {
    console.warn(`MAILGUN_API_KEY is ${process.env.MAILGUN_API_KEY}`)
}
if (!process.env.MAILGUN_DOMAIN) {
    console.warn(`MAILGUN_DOMAIN is ${process.env.MAILGUN_DOMAIN}`)
}

class Email {

    /* Send a purhase success email to the user */
    /* txnId - potentially the transaction of the actual burn of JCR tokens (for future work) */
    async sendPurchaseSuccess({txnId, numJCR, email}) {

        // console.log({ 
        //     FROM_ADDRESS,
        //     email,
        //     API_KEY: process.env.MAILGUN_API_KEY,
        // })

        const data = {
            to: [email],
            from: FROM_ADDRESS,
            subject: 'Thank you for your purchase!',
            html: `
                <h2>Thank you for your contribution to slowing Climate Change!</h2>

                <p>You have retired ${numJCR} tonnes of Carbon</p>
                <p>The confirmation of retirement will be forwarded to your email address</p>
            `,
        };

        let success

        await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
            .then(msg => {
                console.log(msg)
                success =  true
            }) // logs response data
            .catch(err => {
                console.log(err)
                success =  false
            }); // logs any error

        return success

    }

    /* Sends a data dump to Just Carbon's specified Email */
    async sendInfoToJustCarbon({
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
    }) {

        const data = {
            to: [JUST_CARBON_EMAIL],
            from: FROM_ADDRESS,
            subject: 'New Burn and Retire',
            html: `
                <p>num JCR: ${numJCR}</p>
                <p>fee: ${fee}</p>
                <p>name: ${name}</p>
                <p>email1: ${email}</p>
                <p>address_1: ${address_1}</p>
                <p>address_2: ${address_2}</p>
                <p>postCode: ${postCode}</p>
                <p>billingRadio: ${billingRadio}</p>
                <p>giftName: ${giftName}</p>
                <p>giftEmail: ${giftEmail}</p>
                <p>subscribeCheck: ${subscribeCheck}</p>
                <p>tncCheck: ${tncCheck}</p>
                <p>checkout: ${checkout}</p>
            `,
          }

        let success;

        await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
            .then(msg => {
                console.log(msg)
                success =  true
            }) // logs response data
            .catch(err => {
                console.log(err)
                success =  false
            }); // logs any error

        return success

    }

    async sendContact({
        name,
        email,
        details
    }) {

        const data = {
            to: [JUST_CARBON_EMAIL],
            from: FROM_ADDRESS,
            subject: 'Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                
                <p>name: ${name}</p>
                <p>email: ${email}</p>
                <p>details: ${details}</p>
            `,
        };

        let success

        await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
            .then(msg => {
                console.log(msg)
                success =  true
            }) // logs response data
            .catch(err => {
                console.log(err)
                success =  false
            }); // logs any error

        return success

    }

    async sendDeveloper({
        types,
        name,
        volume,
        walletnumber,
        tnc
    }) {

        const data = {
            to: [JUST_CARBON_EMAIL],
            from: FROM_ADDRESS,
            subject: 'Developer Form Submission',
            html: `
                <h2>New Developer Form Submission</h2>
                
                <p>types: ${types}</p>
                <p>name: ${name}</p>
                <p>volume: ${volume}</p>
                <p>walletnumber: ${walletnumber}</p>
                <p>tnc: ${tnc}</p>
            `,
        };

        let success

        await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
            .then(msg => {
                console.log(msg)
                success =  true
            }) // logs response data
            .catch(err => {
                console.log(err)
                success =  false
            }); // logs any error

        return success

    }


  }

  export default Email