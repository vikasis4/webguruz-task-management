import Express from "express";

const router = Express.Router();

router.get("/login", (req, res) => {
  res.send("login");
});

export default router;
export const routeName = "auth";
