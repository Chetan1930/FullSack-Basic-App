const { authManage } = require('../middlewares/authmanage');
const routes1 = require('express').Router();

routes1.get('/', authManage, async (req, res) => {
  try {
    res.send("ab aap login ho gye h");
  } catch (error) {
    res.status(501);
    console.error("bhai phele login kr le",error.message);
  }
});

module.exports = routes1;
