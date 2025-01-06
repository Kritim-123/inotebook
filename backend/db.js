import { connect } from "mongoose";

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
  connect(mongoURI)
    .then(() => console.log("Connected"))
    .catch((e) => console.log(e.message));
};

export default connectToMongo;
