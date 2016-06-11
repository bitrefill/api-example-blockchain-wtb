require('dotenv').load();
var debug = require('debug')('bitrefill-api');
var _ = require('lodash');
var util = require('util');
var Promise = require('bluebird');
var requestPromise = require('request-promise');

var API_USER = process.env.BITREFILL_API_USER;
var API_PASS = process.env.BITREFILL_API_PASS;
var API_BASE = process.env.BITREFILL_API_BASE;



function bitrefillRequest(endpoint, params, method){
    if(!API_USER || !API_PASS){
        throw new Error('BITREFILL_API_USER and BITREFILL_API_PASS must be set');
    }

    var input = {
        json    : true,
        // url     : API_BASE.replace('://', '://'+encodeURIComponent(API_USER) + ':'+encodeURIComponent(API_PASS)+'@') + endpoint,
        url     : API_BASE + endpoint,
        auth : {
            user : API_USER,
            pass : API_PASS,
        },
        method  : method || 'POST'
    };

    // debug(input.url);

    if(params){
        var selector = (input.method == 'POST') ? 'body' : 'qs';
        input[selector] = params;
    }

  return requestPromise(input);
}

function dump(data){
    debug(util.inspect(data, {depth: null, showHidden: false, colors: true}));
}




















/*
// STEP 1: CHECK THAT API CALLS ARE WORKING

bitrefillRequest('/inventory', null, 'GET').then( inventory => {
    debug(util.inspect(inventory, {depth: null, showHidden: false, colors: true}));
});


*/


















/*


// STEP 2: TEST A NUMBER LOOKUP

// var testNumber = '27740164951';
var testNumber = '380995353237';
bitrefillRequest('/lookup_number', {number:testNumber}, 'GET').then(dump);


*/


















/*
// STEP 2B: Wrong operator? Just override it!

var testNumber = '27740164951';
var operatorSlug = 'vodacom-south-africa';
bitrefillRequest('/lookup_number', {number:testNumber, operatorSlug : operatorSlug}, 'GET').then(dump);

*/





















/*
// STEP 3: Let's place an order!





var operatorSlug = 'cell-c-south-africa';
var testNumber = '27740164951';

bitrefillRequest('/order', {
    number : testNumber,
    operatorSlug : operatorSlug,
    valuePackage: '5',
    email: 'sergej@bitrefill.com',
    sendEmail: true,
    webhook_url : 'http://requestb.in/1d5he421',
}).then(dump);

*/










/*
 
// STEP 4: Let's make a real payment!


var wallet = require('./wallet.js');


var operatorSlug = 'cell-c-south-africa';
var testNumber = '27740164951';

bitrefillRequest('/order', {
    number : testNumber,
    operatorSlug : operatorSlug,
    valuePackage: '5',
    email: 'sergej@bitrefill.com',
    sendEmail: true,
    webhook_url : 'http://requestb.in/1d5he421',
}).then( order => {
    dump(order);

    order.payment.address;
    order.payment.satoshiPrice;
    return wallet.sendBTC({
        toAddress : order.payment.address,
        amount : order.payment.satoshiPrice,
        message : `Bitrefill ${order.itemDesc} ${order.orderId}`,
    });
}).then(dump);


*/











/*

// STEP 4b: Let's make a real payment - and automatic refunds


var wallet = require('./wallet.js');


var operatorSlug = 'mts-ukraine';
var testNumber = '380995353237';



return wallet.getAddress()
.then( refund_btc_address => {
    return bitrefillRequest('/order', {
        number : testNumber,
        operatorSlug : operatorSlug,
        valuePackage: 10,
        email: 'sergej@bitrefill.com',
        sendEmail: true,
        webhook_url : 'http://requestb.in/1d5he421',
        refund_btc_address : refund_btc_address,
    });
}).then( order => {
    dump(order);

    order.payment.address;
    order.payment.satoshiPrice;
    return wallet.sendBTC({
        toAddress : order.payment.address,
        amount : order.payment.satoshiPrice,
        message : `Bitrefill ${order.itemDesc} ${order.orderId}`,
    });
}).then(dump);


*/











/*


// STEP 5: Check order status
var orderId = '575c29814074bd030052ba68';

bitrefillRequest('/order/'+orderId, null, 'GET').then(dump);




*/