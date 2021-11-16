const request = require("request")
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser')

module.exports = async ({ user = '' , type = 'basic' }) => {
    return new Promise((y, n) => {
        if (!(user instanceof CoolBuxUser)) return n('Invalid Object Instance')
        if (!['basic', 'iron', 'gold', 'diamond', 'mythic'].includes(type)) return n('Invalid Crate Type')

        var crate
        switch(type) {
            case 'basic': crate = 1; break
            case 'iron': crate = 2; break
            case 'gold': crate = 3; break
            case 'diamond': crate = 4; break
            case 'mythic': crate = 5; break
        }

        request({
            'url': `https://www.coolbux.live/api/v1/loot/unlock/${crate}/${user.name}/${user.pin}`,
            'headers': { 'User-Agent': 'ipec-coolbux-wrapper' }
        }, (err, res, body) => {
            if (err) return n(err)
            try {
                var parsed = JSON.parse(body)
                return y(parsed)
            } catch(o) { return n(o) }
        })
    })  
}