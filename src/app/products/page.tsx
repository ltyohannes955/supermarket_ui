"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/heder";
import { useGetAllProductsQuery } from "../services/products";
import {
  Flex,
  Image,
  Loader,
  Title,
  Card,
  SimpleGrid,
  TextInput,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  ShoppingCartCheckIn01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import Cookies from "js-cookie";
import { notifications } from "@mantine/notifications";

export default function Products() {
  const theme = useMantineTheme();
  const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [searchTerm, setSearchTerm] = useState("");

  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.id === productId);
  };

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 5;
  };

  const { data, isLoading, error } = useGetAllProductsQuery();
  const products = data?.data || [];

  const filteredProducts = products.filter((product: any) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term)
    );
  });

  if (isLoading)
    return (
      <>
        <Header />
        <Flex justify={"center"} align={"center"} h={"80vh"} w={"100%"}>
          <Loader />
        </Flex>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <Flex justify={"center"} align={"center"} h={"80vh"} w={"100%"}>
          <Title c={"#e92933"}>Something went wrong</Title>
        </Flex>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <Flex w="100%" justify="center" align="flex-start">
        <Flex
          p="xl"
          w={{ base: "95%", sm: "90%", md: "85%", lg: "75%" }}
          justify="center"
          align="center"
          direction="column"
          gap="xl"
        >
          <Group w="100%" grow>
            <TextInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              leftSectionPointerEvents="none"
              leftSection={<HugeiconsIcon icon={Search01Icon} size={15} />}
              placeholder="Search"
            />
          </Group>

          <Title w="100%" fz="h2">
            Featured Products
          </Title>

          <SimpleGrid w="100%" cols={getCols()} spacing="lg">
            {filteredProducts.length === 0 ? (
              <Text>No products match your search.</Text>
            ) : (
              filteredProducts.map((product: any) => (
                <Card key={product._id} shadow="lg" radius="md" w="100%">
                  <Card.Section>
                    <Image
                      src={product.image_url}
                      height={160}
                      alt={product.name}
                      fit="cover"
                    />
                  </Card.Section>

                  <Text mt="md" mb="xs" fw={600}>
                    {product.name}
                  </Text>
                  <Text c="gray" size="sm" lineClamp={2}>
                    {product.description}
                  </Text>

                  <Group mt="md" mb="xs" justify="space-between">
                    <Text fw={500}>${product.price.toFixed(2)}</Text>
                    {!isProductInCart(product._id) && (
                      <HugeiconsIcon
                        icon={ShoppingCartCheckIn01Icon}
                        color="#e92933"
                        onClick={() => {
                          const user = Cookies.get("user");
                          if (!user) {
                            notifications.show({
                              title: "Login Required",
                              message: "You need to log in to order products.",
                              color: "red",
                              icon: <HugeiconsIcon icon={Alert01Icon} />,
                            });
                            return;
                          }

                          dispatch(
                            addToCart({
                              ...product,
                              id: product._id,
                              quantity: 1,
                            })
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Group>
                </Card>
              ))
            )}
          </SimpleGrid>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}
