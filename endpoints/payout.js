const request = require("request")
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser')

module.exports = async ({ user = '' , method = 'rbx' , amount = 10 , force_v2 = false }) => {
    return new Promise((y, n) => {
        if (!(user instanceof CoolBuxUser)) return n('Invalid Object Instance')
        if (!['rbx', 'btc', 'ltc', 'gift', 'toy'].includes(method)) return n('Invalid Payment Method')
        if (typeof amount !== 'number') return n('Invalid Amount')

        var url
        switch(method) {
            case 'rbx':
                url = `https://www.coolbux.live/api/v3/payout/${user.name}/${amount}`
            break

            case 'btc':
                url = `https://www.coolbux.live/api/v1/crypto/payout/${amount}/${user.name}/${user.wallets.btc}/btc/${user.pin}`
            break

            case 'ltc':
                url = `https://www.coolbux.live/api/v1/crypto/payout/${amount}/${user.name}/${user.wallets.ltc}/ltc/${user.pin}`
            break

            case 'gift':
                url = `https://www.coolbux.live/api/v1/purchase/giftcard/${user.name}/${user.pin}`
            break

            case 'toy':
                url = `https://www.coolbux.live/api/v1/purchase/toy/${user.name}/${user.pin}`
            break
        }

        if (method == 'rbx') {
            var count = 0
            var backupcount = 0

            function v2() {
                request({
                    'url': `https://www.coolbux.live/api/v2/payout/${user.name}/${amount}`,
                    'headers': { 'User-Agent': 'ipec-coolbux-wrapper' }
                }, (err, res, body) => {
                    if (err) {
                        if (backupcount <= 1) return v2()
                        else return n(err)
                    }

                    try {
                        var parsed = JSON.parse(body)
                        return y(parsed)
                    } catch(o) { return n(o) }                        
                })
            }

            function v3() {
                request({
                    'url': url,
                    'headers': { 'User-Agent': 'ipec-coolbux-wrapper' }
                }, (err, res, body) => {
                    if (err) {
                        if (count <= 1) return v3()
                        else return v2()
                    }
    
                    try {
                        var parsed = JSON.parse(body)
                        return y(parsed)
                    } catch(o) { return n(o) }
                })
            }

            if (force_v2) url = `https://www.coolbux.live/api/v2/payout/${user.name}/${amount}` && v2()
            else v3()
        } else {
            request({
                'url': url,
                'headers': { 'User-Agent': 'ipec-coolbux-wrapper' }
            }, (err, res, body) => {
                if (err) return n(err)
                try {
                    var parsed = JSON.parse(body)
                    return y(parsed)
                } catch(o) { return n(o) }
            })
        }
    })  
}