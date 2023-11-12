import { Router } from "express";
import { tokenVerify } from "../common/token";
import { User } from "../entity/user.entity";

const userRouter = Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const userInfo = await User.create(req.body);
    return res.json(userInfo);
  } catch (err) {
    res.json({ err });
  }
});

userRouter.get("/confirm/:token/:userId", async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const tokenData = tokenVerify(token);
    const userInfo = await User.findOne({ where: { id: Number(userId) } });

    if (!tokenData || !userInfo) {
      res.send(
        `<script type="text/javascript">alert("Not verified"); window.location="/"; </script>`
      );
    } else {
      //*인증 상태값이 필요함 */
      res.send(
        `<script type="text/javascript">alert("Successfully verified"); window.location="/"; </script>`
      );
    }
    res.json();
  } catch (err) {
    res.json({ err });
  }
});

export default userRouter;
