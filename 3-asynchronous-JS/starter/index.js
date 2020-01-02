const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, result) => {
      // return will break the function right away
      if (err) return console.log(err.message);
      console.log(result.body.message);

      fs.writeFile('dog-img.txt', result.body.message, 'utf8', err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    });
});
