var request = require('supertest');
var error = require('./error');
var url = "http://api.wordnik.com:80/v4/word.json";

var definitions = {
   get: function(req, res) {
        var word=req.params.word;
        console.log(word);
        request(url)
            .get('/'+word+'/definitions')
            .set({})
            .query({
                limit: '200',
                includeRelated: 'true',
                useCanonical: 'false',
                includeTags:'false',
                api_key:'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            })
            .end(function(err, response) {
                if (err || response.status!='200')
                    error(res, err,response);
                else
                    res.json(response.body); //check res status
            })
    }
}
     


module.exports = definitions;
