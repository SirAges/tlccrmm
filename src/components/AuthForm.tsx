"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
    Doctors,
    GenderOptions,
    IdentificationTypes,
    PatientFormDefaultValues
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { authFormSchema } from "@/lib/utils";

import CustomFormField, { FormFieldType } from "./CustomFormField";
import { FileUploader } from "./FileUploader";
import SubmitButton from "./SubmitButton";

import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            // Sign up with Appwrite & create plaid token
            console.log("data", data);
            if (type === "sign-up") {
                const newUser = await signUp(data);

                setUser(newUser);
            }

            if (type === "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });

                if (response) router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-12"
            >
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    placeholder="+1234567890"
                    iconSrc="/assets/images/user.svg"
                    iconAlt="phone"
                />
                <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
            </form>
        </Form>
    );
};

export default AuthForm;
