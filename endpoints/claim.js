const request = require("request")
const CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser')

module.exports = async ({ user = '', type = 'yt' }) => {
    return new Promise((y, n) => {
        if (!(user instanceof CoolBuxUser)) return n('Invalid Object Instance')
        if (!['yt', 'dc'].includes(type)) return n('Invalid Reward')

        var url
        switch (type) {
            case 'yt':
                url = `https://www.coolbux.live/api/v1/claimyt/${user.name}`
            break

            case 'dc':
                url = `https://www.coolbux.live/api/v1/claimdisc/${user.name}`
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