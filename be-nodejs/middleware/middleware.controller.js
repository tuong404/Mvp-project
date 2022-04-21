const jwt = require('jsonwebtoken');
const middlewareController = {
    // const checkToken = async (req, res, next) => {
    //     //get authcookie from request
    //     const token = req.cookies.cookieToken;
    
    //     //verify token which is in cookie value
    //     await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //         if (err) {
    //             return res.status(403).json("Token is not valid");
    //           } 
    //             req.user = decoded;
    //             next();
    //         })
    // };
    
    authen: (req, res, next) => {
    
        // const token = req.cookies.cookieToken;
        // const headers = req.headers;
        // const authHeader = headers['authorization'];

        // if(authHeader) {
        //     const token = authHeader && authHeader.split(" ")[1];
        //     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        //         // const username = req.user.username;
        //         if (err) {
        //             return res.status(403).json("Token is not valid");
        //           } 
        //             req.user = decoded;
        //             next();
        //         })
        // } else {
        //     return res.status(401).json("You're not authenticated");
        // }

        const token = req.cookies.cookieToken;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                // const username = req.user.username;
                if (err) {
                    return res.status(403).json("Token is not valid");
                } 
                    req.user = decoded;
                    next();
                })
        } else {
            return res.status(401).json("You're not authenticated");
        }

    },

    author: (req, res , next) => {
        // const token = req.cookies.cookieToken;
       
        // if(token) {
        //     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        //         // const username = req.user.username;
        //         if (err) {
        //             return res.status(403).json("Token is not valid");
        //           } 
        //             req.user = decoded;
        //             const role = req.user.role;
        //         if(role == 'Admin') {
                    
        //             next();
        //         } else {
        //             return res.status(403).json("You're not allowed access. Only admin to access!");
                
        //         }})
        // } else {
        //     return res.status(401).json("You're not authenticated");
        // }
        middlewareController.authen(req, res, () => {
            const role = req.user.role;
            if(role == 'Admin') {
                    next();
            } else {
                return res.status(403).json("You're not allowed access. Only admin to access!");            
            }})
    }
}
// const checkToken = async (req, res, next) => {
//     //get authcookie from request
//     const token = req.cookies.cookieToken;

//     //verify token which is in cookie value
//     await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json("Token is not valid");
//           } 
//             req.user = decoded;
//             next();
//         })
// };

// const authen = (req, res, next) => {

//     // const token = req.cookies.cookieToken;
//     // // const token = authHeader && authHeader.split(" ")[1];
//     // // const accessToken = token;
   
//     const headers = req.headers;
//     const authHeader = headers['authorization'];
//     // const token = req.cookies.cookieToken;
//     // // // const accessToken = decodeJWT(token);
//     // // const accessToken = token;
//     if(authHeader) {
//         const token = authHeader && authHeader.split(" ")[1];
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             // const username = req.user.username;
//             if (err) {
//                 return res.status(403).json("Token is not valid");
//               } 
//                 req.user = decoded;
//                 next();
//             })
//     } else {
//         return res.status(401).json("You're not authenticated");
//     }
// };

// const author = (req, res , next) => {
//     // const token = req.cookies.cookieToken;
   
//     // if(token) {
//     //     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     //         // const username = req.user.username;
//     //         if (err) {
//     //             return res.status(403).json("Token is not valid");
//     //           } 
//     //             req.user = decoded;
//     //             const role = req.user.role;
//     //         if(role == 'Admin') {
                
//     //             next();
//     //         } else {
//     //             return res.status(403).json("You're not allowed access. Only admin to access!");
            
//     //         }})
//     // } else {
//     //     return res.status(401).json("You're not authenticated");
//     // }
//     middlewareController.authen(req, res, () => {
//         if(role == 'Admin') {
//                 next();
//             } else {
//                 return res.status(403).json("You're not allowed access. Only admin to access!");
                    
//             }})
// };



// module.exports = {
//     checkToken,
//     authen,
//     author,
// };
module.exports = middlewareController;