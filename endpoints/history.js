const request = require("request")
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser')

module.exports = async ({ user = '' }) => {
    return new Promise((y, n) => {
        if (!(user instanceof CoolBuxUser)) return n('Invalid Object Instance')

        request({
            'url': `https://www.coolbux.live/api/history/${user.name}`,
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