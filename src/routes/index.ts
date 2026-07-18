import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.json({
        message:"Testing espm method"
    })
})

export default router;