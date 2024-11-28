import { app } from "./app"
import env from './utils/validate-ENV'

app.listen(env.PORT, () =>
{
    console.log(`Server running at PORT [${env.PORT}]`)
})