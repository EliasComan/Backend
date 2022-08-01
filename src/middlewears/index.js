


const  auth = (req, res, next) =>{
    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

    if (!authHeader) {
        return res.status(401).json({error: 'not authenticated'});
    }

    console.log('TOKEN', authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (err, datos)=>{
        if (err) {
            return res.status(403).json({
                error: 'not authorized'
            });
        }

        console.log('datos', datos)

        req.user = datos;
        next();
    });
}

module.exports = auth