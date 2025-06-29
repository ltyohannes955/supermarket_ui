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
import { notifications } from "@mantine/notifications";
import { CheckUnread01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      notifications.show({
        title: "Missing Fields",
        message: "Please fill in both email and password.",
        color: "orange",
        icon: <HugeiconsIcon icon={CheckUnread01Icon} />,
      });
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      // Save user data (optional)
      Cookies.set("user", JSON.stringify(res.user), { expires: 7 });

      notifications.show({
        title: "Login Successful",
        message: "Welcome back!",
        color: "green",
        icon: <HugeiconsIcon icon={Tick01Icon} />,
      });

      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      notifications.show({
        title: "Login Failed",
        message:
          error?.data?.message ||
          "Invalid credentials or server error. Please try again.",
        color: "red",
        icon: <HugeiconsIcon icon={CheckUnread01Icon} />,
      });
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
      px={{ base: "md", sm: "xl" }}
    >
      {/* Logo */}
      <Flex justify="center" align="center" gap="sm">
        <HugeiconsIcon icon={Flag02Icon} size={32} />
        <Text fw="bold" fz="h2">
          FreshMart
        </Text>
      </Flex>

      {/* Login Card */}
      <Card
        w={{ base: "100%", sm: "80%", md: "60%", lg: "40%" }}
        p="xl"
        withBorder
        shadow="xl"
        radius="lg"
      >
        <Flex direction="column" gap="lg">
          <Text fw="bold" ta="center" size="xl">
            Welcome Back, Login
          </Text>

          <TextInput
            label="Email"
            variant="filled"
            size="md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            variant="filled"
            size="md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Text ta="right" c="red" style={{ cursor: "pointer" }}>
            Forgot Password?
          </Text>

          <Flex direction="column" gap="sm" align="center">
            <Button
              size="md"
              w={{ base: "100%", sm: "70%", md: "50%" }}
              onClick={handleLogin}
              loading={isLoading}
              loaderProps={{ type: "dots" }}
            >
              Login
            </Button>

            <Text ta="center">
              {"Don't have an account?"}{" "}
              <Text
                span
                c="red"
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
