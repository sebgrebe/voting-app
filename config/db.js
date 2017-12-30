if (process.env.NODE_ENV === "production") {
	db_url = process.env.MONGODB_URI
}
else {
	db_url = process.env.MONGODB_LOCAL
}
module.exports = {
	'url': db_url
}