const express = require("express")
const cors = require('cors');

const app = express()

app.use(cors({
    origin: '*'
}));


app.get('/getPriorityList', (req,res, next) =>{
    const priorityList = [
        'Urgent',
        'Regular',
        'Trivial'
    ];

    res.json(priorityList);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});