const request = require("request")
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser')

module.exports = async ({ user = '' , referrer = ''}) => {
    return new Promise((y, n) => {
        if (!(user instanceof CoolBuxUser)) return n('Invalid Object Instance')
        if (referrer && !(referrer instanceof CoolBuxUser)) return n('Invalid Object Instance')

        var url
        switch(!!referrer) {
            case true:
                url = `https://www.coolbux.live/api/v1/referral/signup/${referrer.name}/${user.name}`
            break

            case false:
                url = `https://www.coolbux.live/register/${user.name}`
            break
        }

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
    })  
}