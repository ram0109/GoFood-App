const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ramprasad0768:Mundhry2024@cluster0.w65yaix.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
    await mongoose.connect(mongoURI//, { useNewUrlParser: true }, async (err, result) => {
    //     if (err) console.log("---", err)
    //     else {
    //         console.log("connected");
    //         const fetched_data = await mongoose.connection.db.collection("food_items");
    //         fetched_data.find({}).toArray(function (err, data) {
    //             if (err) console.log(err);
    //             else console.log(data);
    //         })
    //     }
    // }
    ).then(async() => {
        console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(//function (err, data) {
            //     if (err) console.log(err);
            //     else console.log(data);
            // }
            
            ).then(async(data)=>{
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray().then((catData)=>{
                    global.food_items=data;
                    global.foodCategory= catData;
                }).catch((err)=>{console.lod(err)})
                
            }).catch((err)=>{console.log(err)})
            
    }).catch((err) => { console.log(err) })
    
    //.then(() => console.log("connected")).catch((err) => { console.log(err) })
}
    // }


     module.exports = mongoDB();

  //  mongoose.connect(mongoURI).then(() => console.log("connected")).catch((err) => { console.log(err) })


// const fetched_data = await mongoose.connection.db.collection("food_items");
// fetched_data.find({}).toArray(function(err, data){
//     if(err) console.log(err);
//     else console.log(data);
// });