const connect = require("../mongodb")
const bcrypt = require("bcrypt")

async function activateUser(db, email, activationCode, password) {
	const salt = bcrypt.genSaltSync(12)
	const hash = bcrypt.hashSync(password, salt)

	try {
		await db.collection("users").findOneAndUpdate({
			email, activationCode
		}, { $set: {
			password: hash, active: true, activationCode: null
		}})
		return {
			statusCode: 200,
			body: ""
		}
	} catch(error) {
		console.log(error)
		return {
			statusCode: 500,
			body: ""
		}
	}
}

exports.handler = async function(event, context) {
	// Check HTTP Method
	if (event.httpMethod !== 'PATCH') {
		return {
			statusCode: 405,
			body: "METHOD NOT ALLOWED",
			headers: {
				"Allow": "PATCH"
			}
		}
	}

	const body = JSON.parse(event.body)
	
	// Validate fields
	if (!body.password) {
		return {
			statusCode: 406,
			body: "NOT ACCEPTABLE"
		}
	}

	const db = await connect()

	return activateUser(db, body.email, body.activationCode, body.password)
}
