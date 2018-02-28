const fs=require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');

const LANG = 'fr';

const STARTING_YEAR = 1900;
const MAX_YEAR=2018;

function getEvents(year) {

    console.log("Parsing year " + year + "." );
    var url = 'https://'+ LANG +'.wikipedia.org/wiki/' + year;

    const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  // START HERE
  rp(options)
    .then(($) => {
        let str="";
        let paraph = $('h2 ~ ul');

        paraph.find('li')
        .each( function(idx, event){        
            str = year + ',' +$(this).text()+'\n';
            fs.appendFile('chronology.txt', str, function (err) {
                if (err) throw err;
                
              });
        })

        if(year < MAX_YEAR) getEvents(year + 1);
    })
    .catch( (err) => {
        console.log(err);
    });
}
getEvents(STARTING_YEAR);