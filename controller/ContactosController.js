const ContactosModel = require("../models/ContactosModel");

class ContactosController {
    constructor(){
        this.contactosModel = new ContactosModel();
        this.add = this.add.bind(this);
    }

    async add(req, res){
        // Validar los datos del formulario
        const { name, email, comment } = req.body;



        //Guardar los datos del formulario
        const ip = req.ip;
        const fecha = new Date().toISOString();

        await this.contactosModel.crearContacto(name, email, comment, ip, fecha);

        const contactos = await this.contactosModel.obtenerAllContactos();
    
        console.log(contactos);

        res.send("Formulario enviado con exito");
    }
}

module.exports = ContactosController;