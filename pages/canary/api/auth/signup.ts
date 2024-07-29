import connectMongo from "../../../../database/conn";
import { getRealUserModel } from "../../../../model/Schema";
import { hash } from "bcryptjs";
import { withApiKeyValidation } from "../utils/withApiKeyValidation";

export default async function handler(request, response) {
  const signUpHandler = async (req, res) => {
    console.log("handler executing,");
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log("Users model:", Users);

    // only post method is accepted
    if (req.method === "POST") {
      if (!req.body)
        return res.status(404).json({ message: "Don't have form data" });
      const {
        email,
        password,
        plans,
        variantID,
        experimentID,
        planPackage,
        Ido,
        country,
        locale,
      } = req.body;

      let planQuota;
      if (planPackage === "professional") {
        planQuota = 11;
      } else if (planPackage === "starter") {
        planQuota = 3;
      }

      const editQuota = 50;

      console.log("plans:", plans);
      console.log("email:", email);
      // check if email is already in use
      const checkexisting = await Users.findOne({ email });
      if (checkexisting) {
        if (locale === "de") {
          return res.status(422).json({
            message:
              "E-Mail wird bereits verwendet. Dies könnte auf eine frühere Zahlungsunfähigkeit zurückzuführen sein, in diesem Fall verwenden Sie einfach eine neue E-Mail",
          });
        } else {
          return res.status(422).json({
            message:
              "Email already in use. this might be due to a failure to make payment in the past, in this case just use a new email",
          });
        }
      }

      try {
        const hashedPassword = await hash(password, 12);
        const currentUTCDate = new Date();
        const cstOffsetInHours = 6;
        const createdAt = new Date(
          currentUTCDate.setHours(currentUTCDate.getHours() - cstOffsetInHours)
        ); // Add this line to create a timestamp for the current time in CST

        const user = new Users({
          email,
          password: hashedPassword,
          plans,
          planQuota,
          editQuota,
          createdAt,
          planPackage,
          variantID,
          experimentID,
          Ido,
          country,
          locale,
        }); // PUT variantID and experimentID here when running new experiment!! ******************************************

        const data = await user.save();
        console.log("data:", data);
        res.status(201).json({ status: true, user: data });
      } catch (err) {
        res.status(404).json({ err });
      }
    } else {
      res.status(405).json({
        message: "Method not allowed, only POST accepted",
      });
    }
  };

  const signUpHandlerWithApiKeyValidation = withApiKeyValidation(signUpHandler);

  await signUpHandlerWithApiKeyValidation(request, response);
}
