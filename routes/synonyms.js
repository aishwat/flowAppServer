var request = require('supertest');
var error = require('./error');
var url = "http://api.wordnik.com:80/v4/word.json";

var synonyms = {
    get: function(req, res) {
        var word = req.params.word;
        console.log(word);
        request(url)
            .get('/' + word + '/relatedWords')
            .set({})
            .query({
                useCanonical: 'false',
                relationshipTypes: 'synonym',
                limitPerRelationshipType: '10',
                api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            })
            .end(function(err, response) {
                if (err || response.status != '200'||response.body === undefined || response.body.length == 0)
                    error(res, err, response);
                else
                {
                    //console.log(response.body);
                    res.json(response.body[0]['words']); //check res status
                }
            })
    }
}



module.exports = synonyms;
