import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT || 4000;

mongoose.connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log(`Equipment-designer app listening to port ${port}`)
    });
  })
  .catch(console.error);