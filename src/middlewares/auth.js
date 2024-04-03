export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/login')
    }
    next()
}

export const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/')
    }
    next()
}

export const checkLogin = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user || !isvValidPassword(user)){
            return res.status(401).send({message: 'Unauthorized'})
        }
        req.user = user
        next()
    } catch (error) {
        console.error(error)
    }
}

export const checkRolAdmin = (req, res, next) => {
    if(req.session.user.role === "admin"){
        next()
    } else {
        return res.status(401).send({message: 'Unauthorized'})
    }
}

export const checkRolUser = (req, res, next) => {
    if(req.session.user.role === "user"){
        next()
    } else {
        return res.status(401).send({message: 'Unauthorized'})
    }
}

