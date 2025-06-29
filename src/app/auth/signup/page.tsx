"use client";

import { useSignUpMutation } from "@/app/services/auth";
import {
  Flag02Icon,
  Tick01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";
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
import { notifications } from "@mantine/notifications";

export default function Signup() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  const [dob, setDob] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showError = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: "red",
      icon: <HugeiconsIcon icon={Alert01Icon} />,
    });
  };

  const handleSignup = async () => {
    // Validation checks
    if (!firstName.trim())
      return showError("Missing Field", "First name is required.");
    if (!lastName.trim())
      return showError("Missing Field", "Last name is required.");
    if (!email.trim()) return showError("Missing Field", "Email is required.");
    if (!password.trim())
      return showError("Missing Field", "Password is required.");
    if (!confirmPassword.trim())
      return showError("Missing Field", "Confirm your password.");
    if (!dob) return showError("Missing Field", "Date of birth is required.");

    if (password !== confirmPassword) {
      return showError("Password Mismatch", "Passwords do not match.");
    }

    const payload = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      DateOfBirth: dob,
    };

    try {
      await signUp(payload).unwrap();
      notifications.show({
        title: "Signup Successful",
        message: "You can now log in",
        color: "green",
        icon: <HugeiconsIcon icon={Tick01Icon} />,
      });
      router.push("/auth/login");
    } catch (error: any) {
      showError(
        "Signup Failed",
        error?.data?.message || "Something went wrong."
      );
      console.error(error);
    }
  };

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

          <Group grow>
            <TextInput
              label="First Name"
              variant="filled"
              size="md"
              placeholder="Enter your first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              label="Last Name"
              variant="filled"
              size="md"
              placeholder="Enter your last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Group>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Group>

          <PasswordInput
            label="Password"
            variant="filled"
            size="md"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            variant="filled"
            size="md"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Flex direction="column" gap="md" align="center">
            <Button
              size="md"
              w={{ base: "100%", sm: "70%", md: "50%" }}
              loading={isLoading}
              onClick={handleSignup}
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
