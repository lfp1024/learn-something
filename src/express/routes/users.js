var express = require('express');
const { route } = require('.');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/*man', (req, res, next) => {
  const param = req.params;
  console.log('param = ', param); // { '0': 'super' }
  res.send('hi,');
});

router.get('/:name/:age', (req, res, next) => {
  const param = req.params;
  console.log('param = ', param); // { name: 'li', age: '23' }
  res.send(`hi:${param.name}`);
});

module.exports = router;
