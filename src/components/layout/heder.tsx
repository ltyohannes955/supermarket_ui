"use client";

import {
  Flag02Icon,
  Logout02Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Drawer,
  Flex,
  Menu,
  Text,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CartModal from "@/components/CartModal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function Header() {
  const [user, setUser] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [cartModalOpened, { open: openCartModal, close: closeCartModal }] =
    useDisclosure(false);
  const [isMobile, setIsMobile] = useState(false);

  const link = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Categories", link: "/categories" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.length;

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(
        parsedUser && Object.keys(parsedUser).length > 0 && parsedUser.name
      );
    }

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser({});
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <>
      <Card w="100%" h="7vh" withBorder px="xl">
        <Flex justify="space-between" align="center" h="100%">
          {/* Logo */}
          <Flex align="center" gap="xs">
            <HugeiconsIcon icon={Flag02Icon} />
            <Text fw="bold" fz="h3">
              FreshMart
            </Text>
          </Flex>

          {/* Mobile View */}
          {isMobile ? (
            <>
              <Burger opened={opened} onClick={toggle} />
              <Drawer
                title="FreshMart"
                opened={opened}
                onClose={close}
                padding="md"
                size="md"
              >
                <Flex
                  direction={"column"}
                  h={"90vh"}
                  justify={"space-between"}
                  gap="lg"
                >
                  <Flex direction={"column"} gap={"lg"}>
                    {link.map((l) => (
                      <Box
                        key={l.name}
                        onClick={() => {
                          router.push(l.link);
                          close();
                        }}
                        style={{
                          color: pathname === l.link ? "#e92933" : undefined,
                          cursor: "pointer",
                        }}
                      >
                        <Text size="md">{l.name}</Text>
                      </Box>
                    ))}
                  </Flex>

                  {!isLoggedIn ? (
                    <Button
                      variant="subtle"
                      onClick={() => {
                        router.push("/auth/login");
                        close();
                      }}
                    >
                      Login
                    </Button>
                  ) : (
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <Flex
                          justify={"start"}
                          align={"center"}
                          w={"100%"}
                          gap={"md"}
                        >
                          <Avatar
                            name={user?.name}
                            color="#ed2b32"
                            radius="xl"
                          />
                          <Text>{user.name}</Text>
                        </Flex>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<HugeiconsIcon icon={Logout02Icon} />}
                          onClick={() => {
                            handleLogout();
                            close();
                          }}
                        >
                          Log Out
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </Flex>
              </Drawer>
            </>
          ) : (
            // Desktop View
            <Flex align="center" gap="xl">
              {link.map((l) => (
                <Box
                  key={l.name}
                  onClick={() => router.push(l.link)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    color: pathname === l.link ? "#e92933" : undefined,
                  }}
                >
                  <Text size="md">{l.name}</Text>
                  {pathname === l.link && (
                    <Box
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: "50%",
                        height: "2px",
                        backgroundColor: "#e92933",
                        borderRadius: "1px",
                      }}
                    />
                  )}
                </Box>
              ))}

              {!isLoggedIn ? (
                <Button
                  variant="subtle"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
              ) : (
                <>
                  <Box style={{ position: "relative" }}>
                    <HugeiconsIcon
                      icon={ShoppingCart01Icon}
                      onClick={openCartModal}
                      style={{ cursor: "pointer" }}
                    />
                    {cartItemCount > 0 && (
                      <Box
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "#e92933",
                          color: "white",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                        }}
                      >
                        {cartItemCount}
                      </Box>
                    )}
                  </Box>

                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Avatar name={user?.name} color="#ed2b32" radius="xl" />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<HugeiconsIcon icon={Logout02Icon} />}
                        onClick={handleLogout}
                      >
                        Log Out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Card>

      {/* 🛒 Cart Modal */}
      <CartModal opened={cartModalOpened} onClose={closeCartModal} />

      {/* ✅ Floating Cart Icon (Mobile Only, If Items > 0) */}
      {isMobile && cartItemCount > 0 && (
        <Box
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#e92933",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            cursor: "pointer",
          }}
          onClick={openCartModal}
        >
          <Flex
            style={{ position: "relative" }}
            justify={"center"}
            align={"center"}
          >
            <HugeiconsIcon icon={ShoppingCart01Icon} color="white" size={28} />
            <Box
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "white",
                color: "#e92933",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 12,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              {cartItemCount}
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}
