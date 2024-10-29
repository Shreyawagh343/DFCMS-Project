import User from "../Module/Usermoduler.js";

import bcrypt from "bcryptjs";

export const Singup = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "user already exists" })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const createuser = await User.create({
                    fullname,
                    email,
                    password: hash
                })

                await createuser.save()
            });
        });
        res.status(201).json({ message: "user created Successfully"
        })
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ message: " Internal server error", user: {
            _id: createuser.id,
            fullname: createuser.fullname,
            email: createuser.email
        } })
    }
};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email})
         const isMatch = await bcrypt.compare(password,
            user.password);
        if(!user || !isMatch){
            return res.status(500).json({message:" Invalid username or password"})
        }
        else {
            return res.status(200).json({
                message: "you can login",
                user: {
                    _id: user.id,
                    fullname: user.fullname,
                    email: user.email
                }
            })
        }
        
    } catch (error) {
        console.log("Error:  ", error)
        res.status(500).json({ message: " Internal server error" })
    }
}