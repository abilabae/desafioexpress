const express=require('express')
const fs=require('fs')
const app=express()

const PORT= process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Estoy en el puerto ${PORT}`)
});


//middlewares
app.use(express.json())


app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});


//consultar canciones
app.get('/canciones',(req,res)=>{
 const canciones= JSON.parse(fs.readFileSync('repertorio.json','utf-8'))
res.send(canciones);
})


//crear canciones
app.post('/canciones', (req, res)=>{
    const cancion=req.body
    const canciones= JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    canciones.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('cancion agregada')
})

//editar canciones
app.put('/canciones/:id', (req,res)=>{
    const id= req.params.id;
    const cancion=req.body;
    const canciones=JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index =canciones.findIndex(cancion=>cancion.id==id);
    canciones[index]= cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('cancion editada');
})

//eliminar canciones
app.delete('/canciones/:id', (req,res)=>{
    const id= req.params.id;
    const canciones=JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index=canciones.findIndex(cancion=>cancion.id==id);
    canciones.splice (index,1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('cancion eliminada');
})



