module.exports.getAllService = (req, res, next) => {
    const {ip, params, query, body, headers,} = req;
    console.log(ip, params, query, body, headers, )
    res.send("got it")
    
}
module.exports.getPostService = (req, res, next) => {
    res.send("Save this post")
}
