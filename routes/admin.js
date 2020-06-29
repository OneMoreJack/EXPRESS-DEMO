var express = require('express')
var router = express.Router()

/**
 * To skip the rest of the router’s middleware functions, call 
 * next('router') to pass control back out of the router instance.
 */

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/:id', function (req, res) {
  res.send('hello, admin!')
})

module.exports = router
