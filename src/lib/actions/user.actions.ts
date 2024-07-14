"use server";
import { currentUser } from "@clerk/nextjs/server";
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

import { revalidatePath } from "next/cache";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_PROJECT
} = process.env;
export const user = async () => {
    const res = await currentUser();

    if (!res) throw new Error("User is not authenticated");
    return res;
};
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("userId", [userId])]
        );

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error);
    }
};

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        });

        const user = await getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error) {
        console.error("Error", error);
    }
};
type SignUpParams = {
    phone: string;
    // userId: string;
    // secret: Appointment;
};
export const getSecret = async ({ phone }: SignUpParams) => {
    try {
        const { account, database } = await createAdminClient();

        const token = await account.createPhoneToken(
            ID.unique(),
            "+2348072921210"
        );
        console.log(token);
        const userId = token.userId;

        if (!token) throw new Error("Error creating user");
        return parseStringify(userId);
    } catch (error) {
        console.log(error);
    }
};
export const signUp = async ({ userId, secret }: SignUpParams) => {
    try {
        const { account, database } = await createAdminClient();
        const session = await account.createSession(
            "66925324001f02347628",
            "089511"
        );
        console.log(session);
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true
        });

        return parseStringify(session);
    } catch (error) {
        console.error("Error", error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id });

        return parseStringify(user);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete("appwrite-session");

        await account.deleteSession("current");
    } catch (error) {
        return null;
    }
};
