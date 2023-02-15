const Cart = require("../models/cart");
const Product = require("../models/product");
const sendSummary = require("./sendSummary");

const cartControllers = {
  createSummary: async (req, res) => {
    console.log(req.body);
    let { productsCart, purchaseId, userId, payer, date, amount, status } =
      req.body.summary;

    let arrayProductsId = productsCart.map((product) => product._id);
    console.log("x", productsCart);
    console.log(arrayProductsId);
    let productsDb = [];

    let newSummary;
    console.log(req.body.summary)


    let error = null;
    try {
      newSummary = await new Cart({
        productsCart: productsCart,
        purchaseId: purchaseId,
        userId: userId,
        payer: payer,
        date: date,
        amount: amount,
        status: status,
      }).save();
      await sendSummary(newSummary);
    } catch (err) {
      error = err;
    }

    try {
      productsDb = await Product.find({ _id: { $in: arrayProductsId } });
      for (const product of productsDb) {
        let productOfCart = productsCart.find(
          (p) => p._id === product._id.toString()
        );
        product.stock = product.stock - productOfCart.quantity;
        await product.save();
      }
    } catch (err) {
      error = err;
    }
    console.log(productsDb);

    res.json({
      res: error ? "ERROR" : newSummary,
      success: error ? false : true,
      error: error,
    });
  },

  getSustainable: async (req, res) => {
    let summary = [];
    let error;
    let arraySustainable = [];
    let sustainable = 0;

    try {
      summary = await Cart.find();
    } catch (err) {
      error = err;
    }

    summary.map((summ) => {
      summ.productsCart.map((p) =>
        arraySustainable.push(p.sustainable * p.quantity)
      );
    });

    let sustainableFull = arraySustainable.reduce(
      (total, item) => total + item
    );

    res.json({
      res: error ? "ERROR" : sustainableFull,
      success: error ? false : true,
      error: error,
    });
  },

  // getSummaryUser: async (res, req) => {
  //   console.log("asdsa");
  // console.log("req", req);
  // const id = req.user._id;
  // const summary = [];
  // let error;

  // try {
  //   summary = await Cart.find({ userId: id });
  // } catch (err) {
  //   error = err;
  // }
  // console.log(summary);
  // res.json({
  //   res: error ? "ERROR" : summary,
  //   success: error ? false : true,
  //   error: error,
  // });
  // },
};

module.exports = cartControllers;
