let express = require('express');
let app = express();
let data = require('./public/users.json');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

app.get('/users', (req, res) => {
    if(!data){
        res.status(404).send('These are not the users you are looking for.')
    }
    res.send(data);
});

app.get('/users/:id', function(req,res) {
    const sData = data.users.find(function(user){
        console.log(user.id);

        return parseInt(req.params.id) === user.id;
    });

    if(!sData){
        res.status(404).send('These are not the users you are looking for.')
    }

    res.send(sData);
});

// app.post('/users', (req, res) => {
//     const user = {
//         name: req.query.name,
//         id: data.users.length + 1,
//         lastName: req.query.lastName,
//         email: req.query.email
//     };
//     data.users.push(user);
//     res.send(user)
// });

app.post('/users', (req,res) =>{ // the path is /employees. the callback function with the parameters of req and res. 
  // console.log(data)
    const eData = {
        id: data.users.length + 1, // grabbing the id by data.employees but increasing the increment by 1 each time
        name:req.body.name, 
        lastName: req.body.lastName,
        email: req.body.email

        
    }; // letting the user post their own name, salary, and department inside of the request body to be added into the JSON object

    
    data.users.push(eData) // pushing the new information given by the user into the eData array.
    res.send(eData) // responds by sending the eData object
    // console.log(eData)
})