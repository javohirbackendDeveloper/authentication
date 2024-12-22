const authSchema = require("../schema/auth.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // const foundedUser = await authSchema.findOne({ email });
    // if (foundedUser) {
    //   return res.json({
    //     message: "this email already used in this site",
    //   });
    // }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_KEY,
      },
    });

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    )
      .join("")
      .trim();

    const sendMail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "verification code",
      html: `<p style = "font-size : 30px">tasdiqlash kodi <b>${randomNumbers}</b></p>`,
    };

    await transporter.sendMail(sendMail, (error, info) => {
      if (error) {
        return res.json({
          message: error,
        });
      } else {
        res.json({
          message: info.response,
        });
      }
    });
    const hash = await bcrypt.hash(password, 12);

    const userRegister = await authSchema.create({
      email,
      username,
      password: hash,
      verify_code: randomNumbers,
    });

    setTimeout(async () => {
      await authSchema.findByIdAndUpdate(userRegister._id, { verify_code: "" });
    }, 120 * 1000);
    res.json({
      message: `The verify code is sent your email.com `,
      html: `<a>${email}</a>`,
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, verify_code_by_user } = req.body;

    const foundedUser = await authSchema.findOne({ email });

    if (!foundedUser) {
      return res.json({
        message: "this user not found",
      });
    }
    if (foundedUser.verify_code == verify_code_by_user) {
      await authSchema.findByIdAndUpdate(foundedUser._id, { verified: true });

      const token = await jwt.sign(
        { email: foundedUser.email, id: foundedUser.id },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_TIME }
      );
      return res.json({
        message: "Verified",
        token,
      });
    } else {
      res.json({
        message: "verify code is invalid or mistake",
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await authSchema.findOne({ email });
    if (!foundedUser) {
      return res.json({
        message: "this email not found ",
      });
    }

    const checkerPassword = await bcrypt.compare(
      password,
      foundedUser.password
    );

    if (!checkerPassword) {
      return res.json({
        message: "Your password is invalid",
      });
    }

    if (foundedUser.verified == true) {
      const token = jwt.sign(
        { id: foundedUser._id, email: foundedUser.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_TIME }
      );
      res.json({
        message: "Logged in successfully",
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verify,
};
