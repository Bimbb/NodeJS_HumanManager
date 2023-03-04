class HelloController {

    index(req, res) {
        res.render("Hello!!!!")
    }
}

module.exports = new HelloController;

