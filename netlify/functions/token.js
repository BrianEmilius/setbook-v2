const bcrypt = require("bcrypt")
const connect = require("../mongodb")
const jwt = require("jsonwebtoken")
const secret = process.env.TOKEN_SECRET

async function getUser(db, email, password) {
	const result = await db.collection("users").find({ email }).toArray()

	if (result.length === 0) {
		return {
			statusCode: 400,
			body: "BAD REQUEST"
		}
	}

	try {
		const isValid = await bcrypt.compare(password, result[0].password)

		if (!isValid) {
			return {
				statusCode: 403,
				body: "FORBIDDEN"
			}
		}

		const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)

		return {
			statusCode: 201,
			body: JSON.stringify({
				token: jwt.sign({ exp, data: {id: result[0]._id} }, secret),
				maxAge: 60 * 60 * 24 * 30
			})
				
		}
	} catch (error) {
		console.log(error)
		return {
			statusCode: 403,
			body: "FORBIDDEN"
		}		
	}
}

exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: "METHOD NOT ALLOWED",
			headers: {
				"Allow": "POST"
			}
		}
	}

	const db = await connect()
	const body = JSON.parse(event.body)

	return getUser(db, body.email, body.password)
}