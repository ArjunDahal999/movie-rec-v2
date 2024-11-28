
import mongoose from 'mongoose'
import env from '../utils/validate-ENV'

export const conntectToDatabase = async () =>
{
    mongoose.connect(`${env.MONGO_URL}`, { dbName: "MovieRecommendation" }).then(() =>
    {
        console.log('DATABASE CONNECTED!')
    }).catch((err: any) =>
    {
        console.log(err)
        console.log("failed to connect the database")
    })

}