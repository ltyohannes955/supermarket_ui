"use client";
import { Box, Container, Text, Group, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Footer() {
  const link = [
    { name: "Home", link: "/home" },
    { name: "Categories", link: "/categories" },
    { name: "Products", link: "/products" },
  ];
  const router = useRouter();
  return (
    <Box
      component="footer"
      w="100%"
      py="md"
      style={{ borderTop: "1px solid #e0e0e0" }}
    >
      <Container px="md">
        <Flex
          direction={"column"}
          gap={"lg"}
          justify={"center"}
          align={"center"}
        >
          <Group gap="md">
            {link.map((link) => (
              <Text
                key={link.name}
                size="sm"
                onClick={() => {
                  router.push(link.link);
                }}
              >
                {link.name}
              </Text>
            ))}
          </Group>
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} Supermarket Checkout
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
