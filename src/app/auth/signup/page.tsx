"use client";
import { Flag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Card,
  Text,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Group,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [value, setValue] = useState<string | null>(null);
  const router = useRouter();
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
        <Card w={"50%"} withBorder shadow="lg">
          <Flex direction={"column"} gap={"lg"}>
            <Text fw={"bold"} ta={"center"} size="xl">
              Welcome
            </Text>
            <Group grow>
              <TextInput
                label="First Name"
                variant="filled"
                size="md"
                placeholder="Enter Your First Name"
              />
              <TextInput
                label="Last Name"
                variant="filled"
                size="md"
                placeholder="Enter Your Last Name"
              />
            </Group>
            <Group grow>
              <DateInput
                value={value}
                onChange={setValue}
                label="Date Of Birth"
                placeholder="Enter your DOB"
                variant="filled"
                size="md"
              />
              <TextInput
                label="Email"
                variant="filled"
                size="md"
                placeholder="Enter Your Email"
              />
            </Group>
            <PasswordInput
              variant="filled"
              size="md"
              label="Password"
              placeholder="Enter Your Password"
            />
            <PasswordInput
              variant="filled"
              size="md"
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
