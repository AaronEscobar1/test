import { connectDb } from 'utils/mongoDB';
import Account from "models/account";


connectDb();

export default async (req, res) => {

    const {method, body} = req
    
    switch (method) {
        case 'GET':
            try {
                const account = await Account.find();
    
                return res.status(200).json(account);   
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case 'POST':
            try {
                const newAccount = new Account(body)
                const saveAccount = await newAccount.save()
    
                return res.status(200).json('account create : ' + saveAccount);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        default:
            return res.status(400).json('method not support');
    }

}