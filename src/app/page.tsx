"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/heder";
import {
  PercentCircleIcon,
  ShoppingCart01Icon,
  TimeQuarter02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Card,
  Flex,
  Text,
  BackgroundImage,
  Button,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Home() {
  const whyCards = [
    {
      name: "Wide Selection",
      description:
        "Browse thousonds of products, including age-restricted items like wine and beer, with easy age verification.",
      icon: <HugeiconsIcon icon={ShoppingCart01Icon} />,
    },
    {
      name: "Fast Delivery",
      description:
        "Get your groceries deliverd in as little as 2 hours, or choose a convenient pickup time.",
      icon: <HugeiconsIcon icon={TimeQuarter02Icon} />,
    },
    {
      name: "Exclusive Descounts",
      description:
        "Enjoy special offers and discounts on your favorite items, with new deals added weekly.",
      icon: <HugeiconsIcon icon={PercentCircleIcon} />,
    },
  ];

  const router = useRouter();
  return (
    <>
      <Header />
      <Flex
        direction={"column"}
        w={"100%"}
        justify={"center"}
        align={"center"}
        p={"md"}
        gap={"lg"}
      >
        <BackgroundImage
          src="/supermarket.svg"
          radius="md"
          w="75%"
          h={600}
          p="xl"
        >
          <Flex
            h="100%"
            direction="column"
            justify="flex-end"
            gap="md"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <Flex direction="column" gap="xs">
              <Title c="white" fw={700} fz={{ base: 24, sm: 32, md: 40 }}>
                Your Local Grocery Store In Your Hands
              </Title>
              <Text c="white" fz={{ base: "sm", md: "md" }}>
                Shop fresh Products, Everyday From The Comfort Of Your Home
              </Text>
            </Flex>

            <Button
              w={{ base: "100%", sm: "50%", md: "20%" }}
              radius="lg"
              size="md"
              variant="filled"
              onClick={() => router.push("/products")}
            >
              Shop Now
            </Button>
          </Flex>
        </BackgroundImage>

        <Flex
          w="75%"
          direction="column"
          gap="lg"
          mt="lg"
          px={{ base: "sm", sm: "md", md: "xl" }}
        >
          <Title ta="left" fz="h1" fw="bolder">
            Why Choose FreshMart?
          </Title>
          <Text ta="left" c="gray">
            {`Experience the convenience and quality of FreshMart's online grocery service.`}
          </Text>

          <Flex
            w="100%"
            justify={{
              base: "center",
              sm: "space-between",
              md: "space-around",
            }}
            wrap="wrap"
            rowGap="lg"
            columnGap="md"
            mb="lg"
          >
            {whyCards.map((card) => (
              <Card
                key={card.name}
                shadow="md"
                withBorder
                radius="md"
                w={{ base: "100%", sm: "45%", md: "30%", lg: "22%" }}
                p="md"
              >
                <Flex direction="column" gap="md">
                  {card.icon}
                  <Text fw="bold" size="md">
                    {card.name}
                  </Text>
                  <Text c="gray" size="sm">
                    {card.description}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
