"use client";
import {
  AccountSetting02Icon,
  Flag02Icon,
  Logout02Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, Card, Flex, Menu, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const link = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "Products", link: "/products" },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/auth/login");
  };
  return (
    <>
      <Card w={"100%"} h={"7vh"} withBorder px={"xl"}>
        <Flex justify={"space-between"} align={"center"}>
          <Flex justify={"center"} align={"center"}>
            <HugeiconsIcon icon={Flag02Icon} />
            <Text fw={"bold"} fz={"h3"}>
              FreshMart
            </Text>
          </Flex>
          <Flex gap={"xl"}>
            {link.map((link) => (
              <Text
                key={link.name}
                size="md"
                onClick={() => {
                  router.push(link.link);
                }}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  color: pathname === link.link ? "#e92933" : undefined,
                }}
              >
                {link.name}
                {pathname === link.link && (
                  <Text
                    span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "0%",
                      width: "50%",
                      height: "2px",
                      backgroundColor: "#e92933",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </Text>
            ))}
          </Flex>
          <Flex justify={"center"} align={"center"} gap={"lg"}>
            <HugeiconsIcon icon={ShoppingCart01Icon} />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar name={user?.name} color="#ed2b32" radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<HugeiconsIcon icon={AccountSetting02Icon} />}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<HugeiconsIcon icon={Logout02Icon} />}
                  onClick={() => handleLogout()}
                >
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
