import bodyParser from 'body-parser'
import user from './userRoute'
import auth from './authenticationRoute'

export default (app: any) => {
    app.use(
        bodyParser.json(),
        auth,
        user,

    )
}

