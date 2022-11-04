import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


const Eval = (a, x, y)=>{
    if(a.includes('add') || a == '+'){
        return Number(x)+Number(y);
    }else
    if(a.includes('subtract') || a == '-'){
        return Number(x)-Number(y);
    }else
    if(a.includes('multiply') || a == '*'){
        return Number(x)*Number(y);
    }
}

const Opr = (a)=>{


    if(a.includes('add') || a == '+'){
        return 'addition';
    }else
    if(a.includes('subtract') || a == '-'){
        return 'subtraction';
    }else
    if(a.includes('multiply') || a == '*'){
        return 'multiplication';
    }
}

app.post('/evaluate', async(req, res)=>{
    const { operation_type, x, y} = req.body;
    
    if(!operation_type || !x || !y){
        return res.status(400).json('input all');
    }

    try {
        const result = await Eval(operation_type, x, y);

        const opV = await Opr(operation_type)

        const data = {
            "slackUsername": 'ayoadeoye',
            "result": result,
            "operation_type": opV
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({exception: error});
    }
    
})

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`listening on port ${PORT}`);
})