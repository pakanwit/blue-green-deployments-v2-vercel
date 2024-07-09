import connectMongo from '../../../database/conn';
import { getRealUserModel } from '../../../model/Schema';
import { withApiKeyValidation } from '../utils/withApiKeyValidation';

export default async function handler(request, response) {
  const saveEditInput1ExecHandler = async (req, res) => {
    console.log('saveEditInputExec executing');
    connectMongo().catch((error) => res.json({ error: error.message }));
    const Users = getRealUserModel();
    console.log('Users model:', Users);

    // only post method is accepted
    if (req.method === 'POST') {
      if (!req.body) {
        console.log('No form data');
        return res.status(404).json({ message: "Don't have form data" });
      }

      const { editInputExec, userEmail: email, planIdNum } = req.body;

      console.log('userEmail:', email);
      console.log('editInputExec:', editInputExec);

      // find user by email
      const user = await Users.findOne({ email });
      console.log('user:', user);
      if (!user) return res.status(404).json({ message: 'User not found' });

      try {
        // Check if plans array exists and is not empty
        if (user.plans && user.plans.length > 0) {
          console.log('Plans array exists and is not empty.');
          // Check if editedVer property exists, if not, initialize it
          if (!user.plans[planIdNum].editedVer) {
            console.log('editedVer property does not exist, initialize it.');
            user.plans[planIdNum].editedVer = {
              editInput: {
                editInputExecs: [],
                editInputSitu1s: [],
                editInputSitu2s: [],
                editInputMark1s: [],
                editInputMark2s: [],
                editInputMark3s: [],
                editInputMark4s: [],
                editInputMark5s: [],
                editInputMark6s: [],
                editInputOp1s: [],
                editInputOp2s: [],
                editInputTech1s: [],
                editInputTech2s: [],
                editInputMang1s: [],
                editInputMang2s: [],
                editInputGrowths: [],
                editInputRisks: [],
              },
            };
          }
          // Check if editInput object and editInputExec array exists, if not, initialize it
          if (!user.plans[planIdNum].editedVer.editInput) {
            console.log('editInput object does not exist, initialize it.');
            user.plans[planIdNum].editedVer.editInput = {
              editInputExecs: [],
              editInputSitu1s: [],
              editInputSitu2s: [],
              editInputMark1s: [],
              editInputMark2s: [],
              editInputMark3s: [],
              editInputMark4s: [],
              editInputMark5s: [],
              editInputMark6s: [],
              editInputOp1s: [],
              editInputOp2s: [],
              editInputTech1s: [],
              editInputTech2s: [],
              editInputMang1s: [],
              editInputMang2s: [],
              editInputGrowths: [],
              editInputRisks: [],
            };
          }
          // Now you can safely push the new editInputExec into the array
          console.log('Pushing new editInputExec into the array.');
          user.plans[planIdNum].editedVer.editInput.editInputExecs.push(
            editInputExec,
          );
        } else {
          // Handle the case where plans array is empty or does not exist
          console.log('Plans array is empty or does not exist.');
          // You might want to initialize the plans array and the editedVer object here
        }

        // save the updated user
        const updatedUser = await user.save();
        console.log('updatedUser:', updatedUser);
        res.status(200).json({ status: true, user: updatedUser });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err });
      }
    } else {
      console.log('Method not allowed, only POST accepted');
      res.status(405).json({
        message: 'Method not allowed, only POST accepted',
      });
    }
  };

  const saveEditInput1ExecHandlerWithApiKeyValidation = withApiKeyValidation(
    saveEditInput1ExecHandler,
  );

  await saveEditInput1ExecHandlerWithApiKeyValidation(request, response);
}
