const getIndex = (req, res) => {
  res.render("index", {
    title: "Home",
  });
};

const getRegister = (req, res) => {
  res.render("register", {
    title: "register",
    link: "register",
  });
};

const getLogin = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const getLogout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

module.exports = {
  getIndex,
  getRegister,
  getLogin,
  getLogout,
};
