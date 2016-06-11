require('dotenv').load();
var debug = require('debug')('wallet');
var _ = require('lodash');
var Promise = require('bluebird');

var Client = require('bitcore-wallet-client');

var client = new Client({
  baseUrl: 'https://bws.bitpay.com/bws/api',
  verbose: false,
});

Promise.promisifyAll(client);


function initClient(){
    return client.importFromMnemonicAsync(process.env.WALLET_MNEMONIC, null);
}




/*
// HOW TO USE: 
    return sendBTC({
        toAddress: address,
        amount: amountInSatoshi,
        message: memo
    });
*/

var sendBTC = function(opts){
    return initClient().then( () =>{
        return client.sendTxProposalAsync(opts);
    }).then( proposal => {
        // debug(proposal);
        return client.signTxProposalAsync(proposal);
    }).then( signedProposal => {
        // debug(signedProposal);
        return client.broadcastTxProposalAsync(signedProposal);
    });
};



// Returns an unused address in this wallet
var getAddress = function(){
    return initClient().then( () => {
        return client.getMainAddressesAsync({})
    }).then(addresses => _.filter(addresses, {hasActivity : null})[0].address);
};


module.exports = {
    getAddress,
    sendBTC,
};