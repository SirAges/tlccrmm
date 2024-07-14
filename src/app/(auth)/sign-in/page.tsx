"use client";
import AuthForm from "@/components/AuthForm";

import {
    getLoggedInUser,
    signIn,
    getSecret,
    signUp
} from "@/lib/actions/user.actions";
const SignIn = () => {
    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthForm type="sign-in" />
            <p
                className="px-6 py-4 bg-amber-600 text-white font-semibold"
                onClick={async () => await getSecret("")}
            >
                verify
            </p>
            <p
                className="px-6 py-4 bg-amber-600 text-white font-semibold"
                onClick={async () => await signUp("","")}
            >
                signUp
            </p>
        </section>
    );
};

export default SignIn;
