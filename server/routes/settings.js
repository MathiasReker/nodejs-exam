import {Router} from "express";
import {Parser} from '@json2csv/plainjs';
import pdf from "html-pdf";

const router = Router();

router.get("/csv", (req, res) => {
    const myData = {"user": "mathias", "email": "test@test.com"};

    try {
        const parser = new Parser();
        const csv = parser.parse(myData);

        res.attachment("gdpr.csv");
        res.status(200).send(csv)
    } catch (err) {
        console.error(err);
    }
})

router.get("/pdf", (req, res) => {

    let options = {format: 'A4'};

    let file = "<h1>Welcome to html-pdf-node</h1>";

    try {
        pdf.create(file, options).toBuffer((err, buffer) => {
            if (err) return console.log(err);

            res.attachment('gdpr.pdf')
            res.end(buffer);
        });
    } catch (err) {
        console.error(err);
    }

})

export default router;