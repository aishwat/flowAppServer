//get a random word 
//fetch full dict
//send single object
var request = require('supertest');
var error = require('./error');
var full_dict = require('./full_dict');
var url = "http://api.wordnik.com:80/v4/words.json";
//words.json not word

var play = {
    get: function(req, res) {
        request(url)
            .get('/randomWord')
            .query({
                hasDictionaryDef: 'true', 
                minCorpusCount: 0,
                maxCorpusCount: -1,
                minDictionaryCount: 1,
                maxDictionaryCount: -1,
                minLength:5,
                maxLength:-1,
                api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            })
            .end(function(err, response) {
                if (err || response.status != '200')
                    error(res, err, response);
                else {
                	req.params.word=response.body.word;
                    //testing
                    // req.params.word="good";
                	full_dict.get(req,res);
                }
            })
    }
}

module.exports = play;
