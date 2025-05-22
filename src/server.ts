import { app } from "app";

const port = 3150;
app.get("/", (_req,res) =>{
    res.send("jokdas")
})


app.listen(port, () =>{
    console.log(`server running on http://localhost:${port}`);
})