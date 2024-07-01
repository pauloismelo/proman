const express = require ("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const SECRET = "proman" // essa variavel deve ir para .env


/*
parte de criptografia de senha. So irei utilizar, caso fizer a tela de cadastro
const bcrypt = require("bcrypt");
const saltRounds = 10;
*/

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"admin123",
    database:"crudgames"
});

app.use(cors());
app.use(express.json());

app.post("/login", (req, res)=>{
    const {email} = req.body;
    const {password} = req.body;
    
    let sql="select * from USER where email=? and password=?"
    db.query(sql, [email, password], (err, result)=>{
        if(err) {
            res.send(err);
        }
        if (result.length >0){
            const token = jwt.sign(result[0].id, SECRET) //300 segundos
            res.send({token: token, msg: "Usuario encontrado!"});
        }else{
            res.send({msg: "Conta nao encontrada!"});
        }
            
            
        

    })
})

app.post("/project", (req,res) => {
    const {name} = req.body;
    const {budget} = req.body;
    //const {category} = req.body;
    const {category} = 'teste';
    const {cost} = req.body;

    let sql = "insert into PROJETOS (name, budget, category, cost) values (?,?,?,?)";
    db.query(sql, [name, budget, category, cost], (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result)
        }
    })
});

app.put("/project", (req, res)=>{
    const {id} = req.body;
    const {name} = req.body;
    const {budget} = req.body;
    const {category} = req.body;

    let sql="update PROJETOS set name = ? , budget = ?, category = ? where id = ?";
    db.query(sql,[name, budget, category, id], (err, result)=>{
        if(err) {
            console.log(err)
        }else {
            res.send(result)
        }
        

    })
})

app.delete("/project/:id", (req,res)=>{
    const id = req.params.id;
    
    let sql="delete from projetos where id = ?"
    db.query(sql, [id], (err,result)=>{
        if (err){
            console.log(err)
            return
        }else{

            //remover tambem os servicos desse projeto
            let sql2 = "delete from SERVICOS where id_projeto = ?";
            db.query(sql2, [id], (err,result)=>{
                if (err){
                    console.log(err)
                }else {
                    res.send(result)
                }
            })
        }
    })

})

app.put("/removeproject", (req, res)=>{
    const {id} = req.body;
    const {id_projeto} = req.body;
    const {cost} = req.body;

    let sql="update PROJETOS set cost = ?  where id = ?";
    db.query(sql,[cost, id_projeto], (err, result)=>{
        if(err) {
            console.log(err)
        }else {
            let sql2="delete from SERVICOS where id = ?";
            db.query(sql2,[id], (err, result)=>{
                if(err) {
                    console.log(err)
                }else {
                    res.send(result)
                }
            })
            
        }
        

    })
})

app.get("/projects", (req, res)=>{
    let sql="select * from PROJETOS"
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        else res.send(result)

    })
})


app.get("/projects/:id", (req, res)=>{
    const {id} = req.params;
    let sql="select * from PROJETOS where id=?"
    db.query(sql,[id], (err, result)=>{
        if(err) {
            console.log(err)
        }else {
            res.send(result)
        }
        

    })
})

app.get("/services/:id", (req, res)=>{
    const {id} = req.params;
    let sql="select * from SERVICOS where id_projeto=?"
    db.query(sql, [id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)

    })
})

app.post("/service", (req,res) => {
    const {id_projeto} = req.body;
    const {name} = req.body;
    const {cost} = req.body;
    const {description} = req.body;
    const {newCost} = req.body;

    let sql = "insert into SERVICOS (id_projeto, nome, cost, description) values (?,?,?,?)";
    db.query(sql, [id_projeto, name, cost, description], (err, result) => {
        if (err){
            console.log(err)
        }else{
            let sql2="update PROJETOS set cost = ?  where id = ?";
            db.query(sql2,[newCost, id_projeto], (err, result)=>{
                if(err) {
                    console.log(err)
                }else {
                    res.send(result)
                }
            });
        }
    });


});

app.get("/categories", (req, res)=>{
    let sql="select * from CATEGORIAS"
    db.query(sql, (err, result)=>{
        if(err) console.log(err)
        else res.send(result)

    })
})




    
app.listen(3001,() =>{
    console.log("rodando servidor")
});
