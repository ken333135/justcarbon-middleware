// import axios from 'axios';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const JUST_CARBON_EMAIL = 'submissions@justcarbon.com'
const JUST_CARBON_EMAIL = 'ken333136@gmail.com'

class Email {

    async sendPurchaseSuccess({txnId, numTokens, email1}) {

        console.log({txnId, numTokens})

        const msg = {
            // to: email1, // Change to your recipient
            to: 'ken333136@gmail.com', // Change to your recipient
            from: 'ken333136@hotmail.com', // Change to your verified sender
            subject: 'Thank you for your purchase!',
            // text: 'and easy to do anywhere, even with Node.js',
            html: `<p>Your tranasction id: ${txnId}</p>
                <br/>
                <p>Tokens Burnt: ${numTokens}</p>
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
                <p>num JCR: ${numJCR}</p><br/>
                <p>name: ${name}</p><br/>
                <p>email1: ${email1}</p><br/>
                <p>address_1: ${address_1}</p><br/>
                <p>address_2: ${address_2}</p><br/>
                <p>postCode: ${postCode}</p><br/>
                <p>billingRadio: ${billingRadio}</p><br/>
                <p>giftName: ${giftName}</p><br/>
                <p>giftEmail: ${giftEmail}</p><br/>
                <p>subscribeCheck: ${subscribeCheck}</p><br/>
                <p>tncCheck: ${tncCheck}</p><br/>
                <p>checkout: ${checkout}</p><br/>
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