import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import authService from "../../services/auth.service";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type LogInData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data: LogInData) => {
        try {
            const userData = await authService.logInUser(data);
            if (!userData.data.token) {
                console.error("An error ocurred while logging in");
                return navigate("/signin");
            }
            setAuth(userData);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box p={40}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "This is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "This is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Box >
    )
}

export default SignIn
