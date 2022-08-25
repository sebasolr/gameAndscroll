const express = require('express');
const session = require('express-session')
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();


// Configuramos formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Se configura uso de sesiones.
app.use(session({ secret: 'hmit' }));


app.use(express.static('node_modules/bootstrap/dist'))

//Se configura nunjucks.
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoscape: true,
    noCache: true,
    watch: true,
});

//Principal


app.get('/', async (req, res) => {
    res.render('index.html')
})

let goldGanado=0
let arrayFrases =[]

app.post('/gold/process_money', async (req, res) => {
    const opcion = req.body.opcion   
    
    if(req.session.puntaje == undefined ){
        req.session.puntaje =0;
    }

    console.log(req.session.puntaje);

    if(opcion=='farm'){
        goldGanado =Math.floor(  Math.random()*(20-10)+10)       
        req.session.puntaje +=  goldGanado   

        mensaje = goldGanado
        arrayFrases.unshift(mensaje)

       console.log(goldGanado,req.session.puntaje); 
    }
    if(opcion=='cave'){
        goldGanado =Math.floor(  Math.random()*(10-5)+5)
        req.session.puntaje +=  goldGanado  

        mensaje = goldGanado
        arrayFrases.unshift(mensaje)

        console.log(goldGanado,req.session.puntaje); 
    }
    if(opcion=='house'){
        goldGanado =Math.floor(  Math.random()*(5-2)+2)
        req.session.puntaje +=  goldGanado  

        mensaje = goldGanado
        arrayFrases.unshift(mensaje)

        console.log(goldGanado,req.session.puntaje); 
        
    }
    if(opcion=='casino')    {
        goldGanado =Math.floor(  Math.random()*(50-(-50))+(-50))
        req.session.puntaje +=  goldGanado 
         if(goldGanado < 0){
            mensaje= goldGanado
         }else{
            mensaje = goldGanado
         }
        
        arrayFrases.unshift(mensaje)

        console.log(goldGanado,req.session.puntaje); 
    }
    
    res.redirect('/gold')
})

app.get('/gold',async(req,res)=>{
    res.render('index.html',{puntaje: req.session.puntaje, goldGanado:goldGanado ,array:arrayFrases})
})

//Ruta por default.
app.get('*', (req, res) => {
    res.send('Ruta no implementada')
})

app.listen(3000, () => {
    console.log(`Servidor en puerto http://localhost:3000/`);
});
