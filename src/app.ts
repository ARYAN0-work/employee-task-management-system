import  express  from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/",router)

app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is healty"
    })
})

export default app;

