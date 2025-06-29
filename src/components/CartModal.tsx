"use client";

import {
  Modal,
  Button,
  Group,
  Text,
  Stack,
  Box,
  Flex,
  Divider,
  Image,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store"; // Import RootState for type safety
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/app/store/cartSlice"; // Import actions
import { useAddOrderMutation } from "@/app/services/order";
import Cookies from "js-cookie";
import { notifications } from "@mantine/notifications";
import { CheckUnread01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface CartModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function CartModal({ opened, onClose }: CartModalProps) {
  const [creatOrder, { isLoading }] = useAddOrderMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleRemoveItem = (uniqueId: string) => {
    dispatch(removeFromCart(uniqueId));
  };

  const handleUpdateQuantity = (uniqueId: string, quantity: number) => {
    dispatch(updateQuantity({ uniqueId, quantity }));
  };

  const handleOrder = async () => {
    const user = JSON.parse(Cookies.get("user") || "{}");
    const userId = user?.id;

    if (!userId) {
      notifications.show({
        title: "Error",
        message: "User not found. Please log in first.",
        color: "red",
        icon: <HugeiconsIcon icon={CheckUnread01Icon} />,
      });
      return;
    }

    const orderPayload = {
      userId,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await creatOrder(orderPayload).unwrap();
      notifications.show({
        title: "Success",
        message: "Your order has been placed!",
        color: "green",
        icon: <HugeiconsIcon icon={Tick01Icon} />,
      });
      onClose();
      dispatch(clearCart());
    } catch (error) {
      notifications.show({
        title: "Order Failed",
        message: "Something went wrong while placing the order.",
        color: "red",
        icon: <HugeiconsIcon icon={CheckUnread01Icon} />,
      });
      console.error("Order error:", error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Your Cart"
      centered
      size="lg"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack>
        {cartItems.length === 0 ? (
          <Flex w={"100%"} justify={"center"} align={"center"}>
            <Text>Nothing added in cart.</Text>
          </Flex>
        ) : (
          <>
            {cartItems.map((item) => (
              <Box key={item.uniqueId} py="xs">
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap="md">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                    <Stack gap={2}>
                      <Text fw={500}>{item.name}</Text>
                      <Text size="sm" c="dimmed">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </Text>
                    </Stack>
                  </Flex>
                  <Group>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        handleUpdateQuantity(item.uniqueId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        handleUpdateQuantity(item.uniqueId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      variant="light"
                      onClick={() => handleRemoveItem(item.uniqueId)}
                    >
                      Remove
                    </Button>
                  </Group>
                </Flex>
                <Divider mt="sm" />
              </Box>
            ))}
            <Flex justify="space-between" mt="md">
              <Text fw={700} fz="lg">
                Total:
              </Text>
              <Text fw={700} fz="lg">
                ${totalPrice.toFixed(2)}
              </Text>
            </Flex>
          </>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={cartItems.length === 0}
            onClick={() => handleOrder()}
            loading={isLoading}
            loaderProps={{ type: "dots" }}
          >
            order
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
