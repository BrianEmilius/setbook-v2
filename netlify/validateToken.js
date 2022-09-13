const jwt = require("jsonwebtoken")
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = function(token) {
	try {
		return jwt.verify(token, TOKEN_SECRET)
	} catch (error) {
		console.log(error)
		return false
	}
}