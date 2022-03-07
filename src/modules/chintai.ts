const axios = require('axios');

const contractId = 'qjzphofsqcry'

class Chintai {

    async getBalance() {

        let data = await axios({
            method:'get',
            url: 'https://demo.justcarbon.com/api/balances',
            headers: {
                'Authorization': process.env.CHINTAI_API_KEY
            }
        })

        const contract = data.data.filter(_data => _data.contract === contractId )[0]
        const balance = contract.total

        return balance
    }

    async burnTokens(amountToBurn) {

        if (!amountToBurn || typeof(amountToBurn) !== 'number' ) { throw 'burnTokens expects a number!'}

        let data = await axios({
            method: 'post',
            url: 'https://demo.justcarbon.com/api/issuance/action/burn-tokens',
            headers: {
                'Authorization': process.env.CHINTAI_API_KEY,
                'Content-Type': 'application/json',
            },
            data: {
                "quantity": `${amountToBurn.toFixed(4)} JCR`,
                "contractName":"qjzphofsqcry"
            }
        })
        
        return { 
            status: data.status,
            data: data.data 
        }

    }
}

export default Chintai