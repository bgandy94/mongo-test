const authService = require('../services/auth.service');
const userService = require('../services/user.service');


module.exports = {
  register: async (req, res) => {
    const userObject = req.body;

    try {
      userObject.password = await authService.hashPassword(userObject.password);

      await userService.add(userObject);
    } catch (e) {
      return res.status(500).send('an error occurred.');
    }

    return res.send('test');
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);

    if (!user) {
      return res.status(401);
    }

    try {
      await authService.checkPassword(password, user.password);
      delete user.password;
    } catch (e) {
      return res.send(403).send('bad password');
    }
    let token;

    try {
      token = await authService
        .generateToken({ username: user.username, name: user.name, id: user._id }); //eslint-disable-line
    } catch (e) {
      next(e);
    }

    return res.send({
      success: true,
      message: 'Authentication Successful!',
      access_token: token,
    });
  },
};
