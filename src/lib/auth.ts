import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse];

export const getAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);
  return session;
};

export const getRequiredAuthSession = async (
  ...parameters: ParametersGetServerSession
) => {
  const session = await getServerSession(...parameters, authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  return session as {
    user: {
      id: string;
      email?: string;
      image?: string;
      name?: string;
    };
  };
};
