// //@ts-nocheck

// import { Prisma } from '@prisma/client';
// import bcrypt from 'bcrypt'; // Import bcrypt
// import jwt from 'jsonwebtoken';
// import { Resend } from 'resend';

// import { FREE_PLAN_NAME } from '@/config';
// import InvitationTeamEmailTemplate, { SendLoginInformationEmailTemplate } from '@/emails/InvitationTeamEmailTemplate';
// import VerifyEmailTemplate from '@/emails/VerifyEmailTemplate';
// import VerifyResetPassEmailTemplate from '@/emails/VerifyResetPassEmailTemplate';
// import { prisma } from '@/lib/prismaClient';
// import { ResetFormSchema } from '@/schema';

// import { copyFeaturesToFeatureUsage } from './actions/authActions';

// // Function to create a user
// export const createUser = async (
//   formData,
//   verificationToken = null,
//   invitedByUser = null,
//   isOAuthUser = false
// ) => {
//   try {
//     let isEmailVerified = true;
//     const { name, email, password } = formData;
//     let hashedPassword = null;
//     if (!isOAuthUser) {
//       hashedPassword = await bcrypt.hash(password, 10);
//       isEmailVerified = false;
//     }

//     // Determine the user's role based on the role of the user who invited them
//     // If invitedByUser is present, check if they are a SUPER_ADMIN or ADMIN and assign "ADMIN" role,
//     // otherwise, assign "TEAM_MEMBER" role. If no invitedByUser is provided, assign "CLIENT" role.
//     const role = invitedByUser
//       ? invitedByUser?.role === 'SUPER_ADMIN' || invitedByUser?.role === 'ADMIN'
//         ? 'ADMIN'
//         : 'TEAM_MEMBER'
//       : 'CLIENT';

//     return await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         emailVerificationToken: verificationToken,
//         emailVerified: isEmailVerified,
//         role,
//       },
//     });
//   } catch (error) {
//     console.error('prisma.user.create', error);
//     // Check for specific Prisma error code for unique constraint violation
//     if (
//       error instanceof Prisma.PrismaClientKnownRequestError &&
//       error.code === 'P2002'
//     ) {
//       const customError = new Error(
//         'Email address already exists. Please use a different email.'
//       );
//       customError.code = 'EMAIL_ALREADY_EXISTS'; // Custom error code
//       throw customError;
//     } else {
//       throw new Error(`Error creating user: ${error.message}`);
//     }
//   }
// };

// // Function to create a team
// export const createTeam = async (userId) => {
//   const randomTeamName = generateRandomString(10);

//   return await prisma.team.create({
//     data: {
//       name: `Team ${randomTeamName}`,
//       createdById: userId,
//       teamMembers: {
//         connect: { id: userId }, // Assuming 'id' is the primary key field for the User model
//       },
//     },
//   });
// };

// // Function to add a user to a subscription plan
// export const subscribeToPlan = async (userId, teamId, planId) => {
//   try {
//     let subscribeToPlanId = await getPlanIdForNewUser(planId, teamId);

//     if (subscribeToPlanId) {
//       await prisma.subscription.create({
//         data: {
//           team: {
//             connect: {
//               id: teamId,
//             },
//           },
//           plan: {
//             connect: {
//               id: subscribeToPlanId,
//             },
//           },
//           status: 'active',
//         },
//       });
//     }
//     console.log('subscribeToPlanId id: ', subscribeToPlanId);
//     copyFeaturesToFeatureUsage(userId, teamId);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Function to send a verification email
// export const sendVerificationEmail = async (
//   userFirstName,
//   userEmail,
//   verificationToken
// ) => {
//   // eslint-disable-next-line no-unused-vars
//   const verificationLink = `${process.env.APP_URL}/verify?token=${verificationToken}`;
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Uprankly Signup <makctg@serppeople.com>',
//       to: [userEmail],
//       subject: 'Confirm Your Email Address',
//       react: (
//         <VerifyEmailTemplate
//           verificationLink={verificationLink}
//           email={userEmail}
//           name={userFirstName}
//         />
//       ),
//     });

//     if (error) throw error;

//     return {
//       statusCode: 200,
//       data,
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       statusCode: 400,
//       error,
//     };
//   }
// };

// //send reset password verification email
// export const sendResetPasswordVerification = async (
//   userFirstName,
//   userEmail,
//   verificationToken
// ) => {
//   // eslint-disable-next-line no-unused-vars
//   const verificationLink = `${process.env.APP_URL}/reset-password?token=${verificationToken}&&email=${userEmail}`;
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Uprankly Signup <makctg@serppeople.com>',
//       to: [userEmail],
//       subject: 'Reset Password', //give a text by sir //todo
//       react: (
//         <VerifyResetPassEmailTemplate
//           verificationLink={verificationLink}
//           email={userEmail}
//           name={userFirstName}
//         />
//       ),
//     });

//     if (error) throw error;

//     return {
//       statusCode: 200,
//       data,
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       statusCode: 400,
//       error,
//     };
//   }
// };

// export async function getTeamByEmail(userEmail) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: userEmail, // Specify the user's email
//       },
//     });

//     if (!user) {
//       throw new Error('User not found ');
//     } else {
//       //create team
//       const team = await prisma.team.findFirst({
//         where: {
//           createdBy: {
//             id: user.id, // Match the user's ID with createdBy field in teams
//           },
//         },
//       });

//       if (!team) {
//         throw new Error('User is not associated with any team');
//       }
      
//       return team;
//     }
//   } catch (error) {
//     console.log(error);
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export function generateRandomString(length) {
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let randomString = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomString += characters.charAt(randomIndex);
//   }

//   return randomString;
// }

// export const markUserVerified = async (userEmail) => {
//   try {
//     const updatedUser = await prisma.user.update({
//       where: { email: userEmail },
//       data: { emailVerified: true },
//     });

//     // Check if the update was successful
//     if (updatedUser) {
//       return { success: true, message: 'User email verified successfully.' };
//     } else {
//       return {
//         success: false,
//         message: 'User not found or email verification failed.',
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: 'Error marking user as verified: ' + error.message,
//     };
//   } finally {
//     await prisma.$disconnect(); // Ensure the database connection is closed
//   }
// };

// // eslint-disable-next-line no-unused-vars
// export const sendResetLinkEmail = async (name, email, resetToken) => {
//   //TODO
//   // console.log('email form authUtil', email, resetToken);
//   try {
//     const parsedResult = ResetFormSchema.safeParse(email);
//     const secretKey = process.env.JWT_SECRET_KEY;
//     const verificationToken = jwt.sign(
//       { email, expiresIn: Math.floor(Date.now() / 1000) + 60 * 5 },
//       secretKey,
   
//     );

//     await sendResetPasswordVerification(name, email, verificationToken);
//   } catch (error) {
//     console.error('error message from authutil', error.message);
//   }
// };

// //

// export async function getValidTeamInvitation(invitationCode) {
//   try {
//     const secretKey = process.env.JWT_SECRET_KEY;

//     // Verify the invitation code and extract the payload (if needed)
//     const decodedToken = jwt.verify(invitationCode, secretKey);

//     // Check if the token is expired
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     if (decodedToken.exp <= currentTime) {
//       return null; // Token is expired
//     }

//     // Find the invitation by its code
//     const invitation = await prisma.teamInvitation.findUnique({
//       where: {
//         code: invitationCode,
//       },
//       include: {
//         invitedByUser: true, // Include the associated user
//       },
//     });
//     if (invitation.isUsed) {
//       return null;
//     }

//     return invitation;
//   } catch (error) {
//     console.error('Error checking invitation code validity:', error.message);

//     return null; // An error occurred or the token is invalid
//   } finally {
//     await prisma.$disconnect(); // Disconnect from the database after operations
//   }
// }

// export async function getUserByEmail(userEmail) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: userEmail },
//       include: {
//         team: {
//           include: {
//             subscription: {
//               include: {
//                 plan: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return user;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
    
//     return {
//       error: true,
//     };
//   }
// }

// export async function getPlanIdForNewUser(planId) {
//   let subscribeToPlanId = planId;

//   if (!planId) {
//     const freePlan = await prisma.plan.findFirst({
//       where: {
//         name: FREE_PLAN_NAME, // Replace with the actual name of your free plan
//       },
//     });

//     if (freePlan) {
//       subscribeToPlanId = freePlan.id;

//     } else {
//       console.log('getPlanIdForNewUser', 'Free plan Missing');
//     }
//   }
  
//   return subscribeToPlanId;
// }

// export async function getCurrentSubscription(email) {
//   try {
//     if (!email) throw new Error('email missing');
//     const user = await getUserByEmail(email);

//     const subscription = user?.team?.subscription ?? null;
    
//     return subscription;
//   } catch (error) {
//     console.error(error);
    
//     return {
//       error,
//     };
//   }
// }

// // Function to send a team invitation email
// export const sendTeamInvitationEmail = async (
//   name,
//   userEmail,
//   invitationToken
// ) => {
//   // eslint-disable-next-line no-unused-vars
//   const verificationLink = `${process.env.APP_URL}/verify-invitation?invitationToken=${invitationToken}`;
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Uprankly Team Invitation <makctg@serppeople.com>',
//       to: [userEmail],
//       subject: 'Team Invitation From Uprankly',
//       react: (
//         <InvitationTeamEmailTemplate
//           name={name}
//           verificationLink={verificationLink}
//         />
//       ),
//     });

//     if (error) throw error;

//     return {
//       statusCode: 200,
//       data,
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       statusCode: 400,
//       error,
//     };
//   }
// };
// // Function to send a team invitation email
// export const sendLoginInformationEmail = async (
//   name,
//   userEmail,
//   password
// ) => {
 
//   try {
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     const { data, error } = await resend.emails.send({
//       from: 'Uprankly Login Information <makctg@serppeople.com>',
//       to: [userEmail],
//       subject: 'Your Login information',
//       react: (
//         <SendLoginInformationEmailTemplate
//           name={name}
//           userEmail={userEmail}
//           password={password}
//         />
//       ),
//     });
  
//     if (error) throw error;
  
//     return {
//       statusCode: 200,
//       data,
//     };
//   } catch (error) {
//     console.error(error);
  
//     return {
//       statusCode: 400,
//       error,
//     };
//   }

// };
