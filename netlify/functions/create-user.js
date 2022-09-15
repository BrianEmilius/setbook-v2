const connect = require("../mongodb")
const { randomBytes } = require("crypto")
const sendmail = require("sendmail")({
	smtpHost:'localhost',
	smtpPort: 25
})

async function getUser(db, user) {
	const result = await db.collection("users").find({ email: user }).toArray()
	return result.length === 0 ? false : true
}

async function createUser(db, email) {
	const activationCode = randomBytes(32).toString('hex')
	
	const result = await db.collection("users").insertOne({
		email,
		activationCode,
		active: false,
		createdAt: new Date().toISOString()
	})

	sendmail({
		from: "no-reply@topshelf.dk",
		to: email,
		subject: "Activate your account",
		html: `<h1>Welcome to SetBook</h1>
		<p>Please click this link to activate your account</p>
		<p><a href="http://localhost:8888/activate-account?e=${email}&c=${activationCode}">http://localhost:8888/activate-account?e=${email}&c=${activationCode}</a></p>`
	}, function(err, reply) {
		console.log(err)
		console.dir(reply)
	})

	return {
		statusCode: 201,
		body: JSON.stringify(result)
	}
}

exports.handler = async function (event, context) {
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

	const body = JSON.parse(event.body)
	
	// Validate fields
	if (!body.email) {
		return {
			statusCode: 406,
			body: "NOT ACCEPTABLE"
		}
	}

	const db = await connect()

	// Check if a user alredy exists with this email
	if (await getUser(db, body.email)) {
		return {
			statusCode: 400,
			body: "BAD REQUEST"
		}
	}

	try {
		return createUser(db, body.email)
	} catch (error) {
		console.log(error)
		return {
			statusCode: 500,
			body: "INTERNAL SERVER ERROR"
		}
	}
}
