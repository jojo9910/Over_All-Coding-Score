var port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('coding_score');
});


app.listen(port, () => {
    console.log(`Running on port ${port}`);
});