import db from '../../db.json';

export default (req,res)=>{

   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.json(db);

}


