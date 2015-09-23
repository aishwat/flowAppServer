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
                limit: '10', //default to 10 //can accept from query 
                includeRelated: 'false',
                useCanonical: 'false',
                includeTags:'false',
                sourceDictionaries:'all',
                api_key:'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
            })
            .end(function(err, response) {
                if (err || response.status!='200')
                    error(res, err,response);
                else
                {
                    //handle async later
                    var result=response.body;
                    var defs=[]
                    for(i in result)
                    {
                        //console.log(result[i]['text']);
                        defs.push(result[i]['text'])
                    }
                    res.send(defs); //res status later
                }
            })
    }
}
     


module.exports = definitions;
