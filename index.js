import express from "express";

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;

app.use(express.json())

//listado de usuarios
const users = [{
    id: 1, nombre: "Luisa", apellido: "Soria", foto: "foto2.png",
    id: 2, nombre: "Miriam", apellido: "Rosa", foto: "foto1.jpg",
    id: 3, nombre: "Miriam", apellido: "Rosa", foto: "foto1.jpg"
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

app.post('/users', (req, res)=> {
    console.log(req.body)
    res.send('Escribimos un user')
    const nuevo_id = users.length+1;
    const nuevo_user = {
    "id": nuevo_id,
    "nombre": req.body.nombre,
    "apellido": req.body.apellido,
    "foto": `foto`+nuevo_id+`.jpg`
}
    users.push(nuevo_user)
})
//put
app.put('/users', (req, res) =>{

   /* const id_act = req.query.id
    console.log(req.query.id)
    console.log(req.body)
    res.send('pp')*/
    
    const user = users.find (u => u.id == req.query.id)
    if(!user)return res.status(404).send('user no existe')
    
    user.nombre = req.body.nombre
    user.apellido = req.body.apellido

    res.json(user)

})

//delete
app.delete('/users', (req, res) => {
const userIndex = users.findIndex(u => u.id == req.query.id)
if (!userIndex) return res.status(404).send("user no existe")
    users.splice(userIndex, 1)
    res.status(204).send()
})

//cannot get
app.use((req, res) =>{
    res.status(404).send('El recurso no existe')
})

app.listen(PORT, console.log('servidor http://Localhost: ${PORT}'))