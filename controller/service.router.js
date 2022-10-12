let services = [
    { id: 1, name: "Graphic Design " },
    { id: 2, name: "Android App Development " },
    { id: 3, name: "Web Development" },
]


module.exports.getAllService = (req, res) => {
    res.send(services);

}
module.exports.getPostService = (req, res) => {
    const newServices = req.body;
    services.push(newServices);
    console.log(services)
    res.send("Save");

}

module.exports.getServiceDetail = (req, res) => {
    const id = req.params.id;

    const foundService = services.find(service => service.id === Number(id));
    res.send(foundService);
    // services.map(service => {
    //     if(id == service.id){
    //         res.send(service)
    //     }
    // })
}

module.exports.updateService = (req, res) => {
    const id = req.params.id;
    // const filter = {_id: id} ;
    const newData = services.find(service => service.id === Number(id));

    newData.id = id;
    newData.name = req.body.name;
    res.send(newData);


}

module.exports.deleteService = (req, res) => {
    const id = req.params.id;
    // const filter = {_id: id} ;
   services = services.filter(service => service.id !== Number(id));
    
    res.send(services);

}