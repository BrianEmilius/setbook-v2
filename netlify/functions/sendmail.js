const sendmail = require("sendmail")({
    smtpHost:'localhost',
    smtpPort: 25
})

exports.handler = async function(event, context) {
	sendmail({
		from: "hello@topshelf.dk",
		to: "brian@brianemilius.com",
		subject: "this is a test",
		html: "<p>Yo!!</p>"
	}, function(err, reply) {
		console.log(err)
		console.dir(reply)
	})
	return {
		statusCode: 200,
		body: "Yay"
	}
}
