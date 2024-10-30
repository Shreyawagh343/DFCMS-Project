import User from "../Module/Usermoduler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const Singup = async (req, res) => {
    try {
        let { fullname, email, password , officerCode} = req.body;
        let user = await User.findOne({ officerCode });
        if (user) return res.status(400).json({ message: "user already exists" })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const createuser = await User.create({
                    fullname,
                    email,
                    password: hash,
                    officerCode,
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
        let { officerCode , password } = req.body;
        const user = await User.findOne({officerCode })
        const token = jwt.sign({ id: user._id }, process.env.YOUR_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token,)
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
                    email: user.email,
                    officerCode:user.officerCode,
                }
            })
        }
        
    } catch (error) {
        console.log("Error:  ", error)
        res.status(500).json({ message: " Internal server error" })
    }
}

