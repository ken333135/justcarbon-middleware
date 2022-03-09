// import axios from 'axios';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const JUST_CARBON_EMAIL = 'submissions@justcarbon.com'
// const JUST_CARBON_EMAIL = 'ken333136@gmail.com'

class Email {

    async sendPurchaseSuccess({txnId, numJCR, email}) {

        const msg = {
            to: email, // Change to your recipient
            /* For Dev */
            // to: 'ken333136@gmail.com', // Change to your recipient
            from: 'ken333136@hotmail.com', // Change to your verified sender
            subject: 'Thank you for your purchase!',
            // text: 'and easy to do anywhere, even with Node.js',
            html: `
                <h2>hank you for your contribution to slowing Climate Change!</h2>

                <p>You have retired ${numJCR} tonnes of Carbon</p>
                <p>The confirmation of retirement will be forwarded to your email address</p>
            `,
          }
          
        await sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error)
                console.log(JSON.stringify(error))
            })

        return

    }


    async sendInfoToJustCarbon({
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
    }) {

        const msg = {
            to: JUST_CARBON_EMAIL, // Change to your recipient
            from: 'ken333136@hotmail.com', // Change to your verified sender
            subject: 'New Burn and Retire',
            html: `
                <p>num JCR: ${numJCR}</p>
                <p>name: ${name}</p>
                <p>email1: ${email1}</p>
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
          

        await sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error)
                console.log(JSON.stringify(error))
            })

        return

    }


  }

  export default Email