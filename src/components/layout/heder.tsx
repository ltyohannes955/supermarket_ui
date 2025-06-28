"use client";
import {
  AccountSetting02Icon,
  Logout02Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, Card, Flex, Menu, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Header() {
  const link = [
    { name: "Home", link: "/home" },
    { name: "Categories", link: "/categories" },
    { name: "Products", link: "/products" },
  ];
  const router = useRouter();

  return (
    <>
      <Card w={"100%"} h={"7vh"} withBorder padding={"md"}>
        <Flex justify={"space-between"} align={"center"}>
          <Flex>
            <Text fw={"bold"}>Logo</Text>
          </Flex>
          <Flex gap={"xl"}>
            {link.map((link) => (
              <Text
                key={link.name}
                size="lg"
                onClick={() => {
                  router.push(link.link);
                }}
              >
                {link.name}
              </Text>
            ))}
          </Flex>
          <Flex justify={"center"} align={"center"} gap={"lg"}>
            <HugeiconsIcon icon={ShoppingCart01Icon} />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar color="#ed2b32" radius="xl">
                  LY
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<HugeiconsIcon icon={AccountSetting02Icon} />}
                >
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<HugeiconsIcon icon={Logout02Icon} />}>
                  Log Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
