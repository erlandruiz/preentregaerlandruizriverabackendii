import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    // failureRedirect: "/api/auth/login-error",
    failureRedirect: "/login?error=true",
  }),
  async (req, res) => {
    const payload = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      maxAge: 100000,
      httpOnly: true,
    });

    // res.status(200).json({
    //   message: "Login success",
    //   token,
    // });

       // Redirigir a la página realtimeproducts.hbs
       res.redirect("/realtimeproducts");
  }
);

router.get("/login-error", (req, res) => {
  res.redirect("/login?error=true");
});


// router.get("/login-error", (req, res) => {
//   // console.log(req.query)

//   res.status(401).json({
//     error: "Unauthorized",
//   });
// });



router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({
      message: "Bienvenido",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  console.log('Este mensaje esta en  auth.routes  Sesión cerrada')
  res.redirect('/login');
  
});

// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     message: "Sesión cerrada",
//   });
// });

export default router;
