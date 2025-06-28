"use client";

import {
  Card,
  Text,
  Flex,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  return (
    <>
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
        <Card w={"50%"} withBorder shadow="lg">
          <Flex direction={"column"} gap={"lg"}>
            <Text fw={"bold"} ta={"center"} size="xl">
              Welcome
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
            <PasswordInput
              variant="filled"
              size="xl"
              label="Password"
              placeholder="Confirm Your Password"
            />
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
                  router.push("");
                }}
              >
                Sign Up
              </Button>
              <Text ta={"right"}>
                Have an account?{" "}
                <Text
                  span
                  c={"red"}
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Login
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
