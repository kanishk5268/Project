const fs = require('fs');
const express = require('express');


const app = express();


app.use(express.json());
// app.get(`/`, (req, res) => {
//     res 
//         .status(200)
//         .json({ message: 'Hello from the server', app: 'starter' });
// })

// app.post('/', (req, res) => {
//     res
//         .send('you can now post to this url');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));// if in const if the variable name would x instead of tours then in the app.get data object{} you would have to do tours: x. But now both  the names are same so you don't need to specify.


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body); 
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

