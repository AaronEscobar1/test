import { connectDb } from 'utils/mongoDB';
import Account from "models/account";

connectDb();

export default async (req, res) => {

    const {method, body, query: {id}} = req
    
    switch (method) {
        case 'GET':
            try {
                const account = await Account.findById(id);
                if (!account) return res.status(404).json({mgs: "the account not fount"});
                return res.status(200).json(account);   
            } catch (error) {
                try {
                    const account = await Account.findOne({ name: id});
                    if (!account) return res.status(404).json({mgs: "the account not fount",  redirect: { destination: '/404', permanent: false }});
                    return res.status(200).json(account);   
                } catch (error) {
                    return res.status(404).json({mgs: "the account not fount"});
                }
            }
        case 'PUT':
            try {
                const account = await Account.findByIdAndUpdate(id, body, {new: true});
                if (!account) return res.status(404).json({mgs: "the account not fount"});
                return res.status(200).json(account);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case 'DELETE':
            try {
                const account = await Account.findByIdAndDelete(id)
                if (!account) return res.status(404).json({mgs: "the account not fount"});
                return res.status(204).json(account);     
            } catch (error) {
                return res.status(400).json({error: error.message});
            }
        default:
            return res.status(400).json('method not support');
    }

}