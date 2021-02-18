import db from '../../db.json';

export default (req,res)=>{

   response.setHeader('Access-Control-Allow-Credentials', true);
   response.setHeader('Access-Control-Allow-Origin', '*');
   response.setHeader('Access-Control-Allow-Methods', 'GET');

    res.json(db);

}


