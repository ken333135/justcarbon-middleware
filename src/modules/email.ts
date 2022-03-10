const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const FROM_ADDRESS = `submissions@${process.env.MAILGUN_DOMAIN}`

// const JUST_CARBON_EMAIL = 'submissions@justcarbon.com'
const JUST_CARBON_EMAIL = 'ken333136@gmail.com'

class Email {

    async sendPurchaseSuccess({txnId, numJCR, email}) {

        const data = {
            to: email, // Change to your recipient
            from: FROM_ADDRESS, // Change to your verified sender
            subject: 'Thank you for your purchase!',
            html: `
                <h2>Thank you for your contribution to slowing Climate Change!</h2>

                <p>You have retired ${numJCR} tonnes of Carbon</p>
                <p>The confirmation of retirement will be forwarded to your email address</p>
            `,
        };

        await mg.messages().send(data, function (error, body) {
            console.log({error,body})
            console.log(body);
        });

        return

    }


    async sendInfoToJustCarbon({
        numJCR,
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
            to: JUST_CARBON_EMAIL, // Change to your recipient
            from: FROM_ADDRESS, // Change to your verified sender
            subject: 'New Burn and Retire',
            html: `
                <p>num JCR: ${numJCR}</p>
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

        await mg.messages().send(data, function (error, body) {
            console.log({ error, body })
            console.log(body);
        });

        return

    }


  }

  export default Email