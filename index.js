import express from "express";

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;

//listado de usuarios
const users = [{id: 1, nombre: "Luis", apellido: "Sosa", foto: "foto1.jpg",
    id: 2, nombre: "Luisa", apellido: "Soria", foto: "foto2.png",
    id: 3, nombre: "Miriam", apellido: "Rosa", foto: "foto3.jpg"
}];
//raiz
app.get('/', (req, res) =>{
    res.send('api, rest ful con datos desde un array')
})
//users
app.get ('/users', (req, res) => {
    res.json(users)
})
//users-id
app.get('/users/:id', (req, res) =>{
    const user = users.find(u => u.id == req.params.id)
    user?res.json(user): res.status(404).send('user no existe') 
})
//find-image
app.get('/image/users/:id', (req, res) =>{

   /* console.log (__dirname)*/
    const user = users.find(u => u.id == req.params.id);
    return res.sendFile(__dirname +'/image/foto'+ req.params.id+'.jpg')

    res.status(404).send('user no existe') 
})

app.listen(PORT, console.log('servidor http://Localhost: ${PORT}'))