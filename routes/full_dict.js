var async = require('async');
var request = require('supertest');
var error = require('./error');
var definitions = require('./definitions');
var synonyms = require('./synonyms');
var antonyms = require('./antonyms');
var examples = require('./examples');
var url = "http://api.wordnik.com:80/v4/words.json"; 
//words.json not word

var full_dict = {
    get: function(req, res) {
        var word = req.params.word;
        var result = {};

        function create_mock_res(callback) { //creating object on every call
            var mock_res = {
                status_code: null,
                send: function(data) { //res collector
                    callback(null, data);
                },
                status: function(code) {
                    status_code = code;
                    return this;
                },
                json: function(data) { //res collector
                    // result[this.caller] = data;
                    callback(null, data);
                }
            };
            return mock_res;
        }

        async.parallel({
                definitions: function(callback) {
                    definitions.get(req, create_mock_res(callback));
                },
                synonyms: function(callback) {
                    synonyms.get(req, create_mock_res(callback));
                },
                antonyms: function(callback) {
                    antonyms.get(req, create_mock_res(callback));
                },
                examples: function(callback) {
                    examples.get(req, create_mock_res(callback));
                },
            },
            function(err, results) {
                console.log(results);
                results.word=word;
                res.send(results);
            });

    },
    getWordOfDay:function(req,res){
        console.log('in get word of day ');
        request(url)
            .get('/wordOfTheDay')
            .query({
                date:'2015-09-23', //later
                api_key:'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            })
            .end(function(err, response) {
                if (err || response.status!='200')
                    error(res, err,response);
                else
                {
                    console.log(response.body.word);
                    req.params.word=response.body.word;
                    full_dict.get(req,res);
                }
            })
    }
}

module.exports = full_dict;
