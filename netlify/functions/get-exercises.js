const connect = require("../mongodb")
const validToken = require("../validateToken")
const { ObjectId } = require("mongodb")

async function getExercises(db, user) {
	var result = await db.collection("exercises").find({ user: ObjectId(user) }).sort({ title: 1 }).toArray()

	return {
		statusCode: 200,
		body: JSON.stringify(result)
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "GET") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "GET"
		}
	}

	// check for required auth header
	if(!event.headers.authorization) return {
		statusCode: 401,
		body: "UNAUTHORIZED"
	}

	// check if auth token is valid
	if(!validToken(event.headers.authorization)) return {
		statusCode: 403,
		body: "FORBIDDEN"
	}

	var db = await connect()
	var userId = validToken(event.headers.authorization).data.id
	return getExercises(db, userId)
}
