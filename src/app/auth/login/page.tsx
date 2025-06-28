"use client";
import {
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
        <Card w={"50%"} withBorder shadow="lg">
          <Flex direction={"column"} gap={"lg"}>
            <Text fw={"bold"} ta={"center"} size="xl">
              Welcome Back, Login
            </Text>
            <TextInput
              label="Email"
              variant="filled"
              size="xl"
              placeholder="Enter Your Email"
            />
            <PasswordInput
              variant="filled"
              size="xl"
              label="Password"
              placeholder="Enter Your Password"
            />
            <Text
              ta={"right"}
              c="red"
              style={{
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Text>
            <Flex
              w={"100%"}
              gap={"md"}
              mt={"md"}
              direction={"column"}
              justify={"center"}
              align={"center"}
            >
              <Button
                size="md"
                w={"50%"}
                onClick={() => {
                  router.push("/home");
                }}
              >
                Login
              </Button>
              <Text ta={"right"}>
                Dont have an account?{" "}
                <Text
                  span
                  c={"red"}
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
