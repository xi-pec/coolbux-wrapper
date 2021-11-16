'use strict'

var claim = require('coolbux-wrapper/endpoints/claim.js')
var headshot = require('coolbux-wrapper/endpoints/headshot.js')
var history = require('coolbux-wrapper/endpoints/history.js')
var information = require('coolbux-wrapper/endpoints/information.js')
var offers = require('coolbux-wrapper/endpoints/offers.js')
var payout = require('coolbux-wrapper/endpoints/payout.js')
var redeem = require('coolbux-wrapper/endpoints/redeem.js')
var referrals = require('coolbux-wrapper/endpoints/referrals.js')
var register = require('coolbux-wrapper/endpoints/register.js')
var validate = require('coolbux-wrapper/endpoints/validate.js')
var vip = require('coolbux-wrapper/endpoints/vip.js')
var CoolBuxUser = require('coolbux-wrapper/objects/coolbuxuser.js')

var APIWrapper = class APIWrapper {
    constructor() {
        this.claim = claim
        this.headshot = headshot
        this.history = history
        this.information = information
        this.offers = offers
        this.payout = payout
        this.redeem = redeem
        this.referrals = referrals
        this.register = register
        this.validate = validate
        this.vip = vip
    }
}

module.exports = { APIWrapper, CoolBuxUser }