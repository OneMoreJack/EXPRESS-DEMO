var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.send('regular user')
})

// handler for the /user/:id path, which renders a special page
router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  res.send('special user')
})

module.exports = router;
