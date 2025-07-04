"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/heder";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "@/app/categories/NothingFoundBackground.module.css";
import { useRouter } from "next/navigation";

export default function Categories() {
  const router = useRouter();
  return (
    <>
      <Header />
      <Container className={classes.root} h={"80vh"}>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>Nothing to see here</Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              Page you are trying to open is still in development it will be
              avalable shortly sorry for the inconvenience
            </Text>
            <Group justify="center">
              <Button onClick={() => router.push("/")} size="md">
                Take me back to home page
              </Button>
            </Group>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
