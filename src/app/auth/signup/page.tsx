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
  const [dob, setDob] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      align="center"
      direction="column"
      gap="lg"
      px={{ base: "md", sm: "lg" }}
    >
      {/* Header */}
      <Flex justify="center" align="center" gap="md">
        <HugeiconsIcon icon={Flag02Icon} size={32} />
        <Text fw="bold" fz="h2">
          FreshMart
        </Text>
      </Flex>

      {/* Signup Form Card */}
      <Card
        w={{ base: "100%", sm: "90%", md: "70%", lg: "50%" }}
        p="xl"
        withBorder
        shadow="lg"
        radius="lg"
      >
        <Flex direction="column" gap="lg">
          <Text fw="bold" ta="center" size="xl">
            Welcome
          </Text>

          {/* First & Last Name */}
          <Group grow>
            <TextInput
              label="First Name"
              variant="filled"
              size="md"
              placeholder="Enter your first name"
              required
            />
            <TextInput
              label="Last Name"
              variant="filled"
              size="md"
              placeholder="Enter your last name"
              required
            />
          </Group>

          {/* DOB & Email */}
          <Group grow>
            <DateInput
              value={dob}
              onChange={setDob}
              label="Date of Birth"
              placeholder="Enter your DOB"
              variant="filled"
              size="md"
              required
            />
            <TextInput
              label="Email"
              variant="filled"
              size="md"
              placeholder="Enter your email"
              required
            />
          </Group>

          {/* Passwords */}
          <PasswordInput
            label="Password"
            variant="filled"
            size="md"
            placeholder="Enter your password"
            required
          />
          <PasswordInput
            label="Confirm Password"
            variant="filled"
            size="md"
            placeholder="Confirm your password"
            required
          />

          {/* Buttons */}
          <Flex direction="column" gap="md" align="center">
            <Button
              size="md"
              w={{ base: "100%", sm: "70%", md: "50%" }}
              onClick={() => router.push("/")} // Replace with actual submit
            >
              Sign Up
            </Button>

            <Text ta="center">
              Have an account?{" "}
              <Text
                span
                c="red"
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
