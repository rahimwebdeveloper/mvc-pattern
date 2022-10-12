const services = [
    { id: 1, name: "Graphic Design " },
    { id: 2, name: "Android App Development " },
    { id: 3, name: "Web Development" },
]


module.exports.getAllService = (req, res, next) => {
    res.send(services);

}
module.exports.getPostService = (req, res, next) => {
    console.log(req.body);
    res.send(req.body);

}

module.exports.getServiceDetail = (req, res, next) => {
    const id = req.params.id;

    const foundService = services.find(service => service.id === Number(id));
    res.send(foundService);
    // services.map(service => {
    //     if(id == service.id){
    //         res.send(service)
    //     }
    // })
}