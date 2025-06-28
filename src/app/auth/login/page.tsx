"use client";
import { useLoginMutation } from "@/app/services/auth";
import { Flag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlLogin = async () => {
    try {
      await login({ email: email, password: password }).unwrap();
      router.push("/");
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };
  return (
    <>
      <Flex
        w={"100%"}
        h={"100vh"}
        justify={"center"}
        direction={"column"}
        gap={"lg"}
        align={"center"}
      >
        <Flex justify={"center"} align={"center"} gap={"md"}>
          <HugeiconsIcon icon={Flag02Icon} size={32} />
          <Text fw={"bold"} fz={"h2"}>
            FreshMart
          </Text>
        </Flex>
        <Card w={"35%"} withBorder shadow="xl" radius={"lg"}>
          <Flex direction={"column"} gap={"lg"}>
            <Text fw={"bold"} ta={"center"} size="xl">
              Welcome Back, Login
            </Text>
            <TextInput
              label="Email"
              variant="filled"
              size="md"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              variant="filled"
              size="md"
              label="Password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  handlLogin();
                }}
                loading={isLoading}
                loaderProps={{ type: "dots" }}
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
