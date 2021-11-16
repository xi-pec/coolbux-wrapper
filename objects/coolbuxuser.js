module.exports = class {
    constructor({name, pin, btcwallet, ltcwallet}) {
        this.name = name
        this.pin = pin
        this.wallets = {
            btc: btcwallet,
            ltc: ltcwallet
        }
    }
}