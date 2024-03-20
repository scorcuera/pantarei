type LogInData = {
    email: string;
    password: string;
};

const authService = {
    logInUser: async (data: LogInData) => {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.log(error);
        }
    }
}

export default authService;