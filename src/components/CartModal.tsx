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
import {
  useCreateOrderMutation,
  useOrderInitMutation,
} from "@/app/services/delivery_order";
import { useState } from "react";

interface CartModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function CartModal({ opened, onClose }: CartModalProps) {
  const [dropOff, setDropOff] = useState([]);
  const [dropOffInput, setDropOffInput] = useState("");
  const [originLat, setOriginLat] = useState("");
  const [originLon, setOriginLon] = useState("");
  const [destinationLat, setDestinationLat] = useState("");
  const [destinationLon, setDestinationLon] = useState("");
  const [creatOrder, { isLoading }] = useAddOrderMutation();
  const [orderInit] = useOrderInitMutation();
  const [createDeliveryOrder] = useCreateOrderMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    destination: `${destinationLat},${destinationLon}`,
    destination_name: dropOffInput,
    price: 0,
    customer_name: "",
    customer_phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceCalculation = async (
    originLat: string,
    originLon: string,
    destinationLat: string,
    destinationLon: string
  ) => {
    try {
      const response = await fetch(
        `https://liyt-api-849543905413.europe-west1.run.app/orders/get_price?origin=${originLat},${originLon}&destination=${destinationLat},${destinationLon}`
      );
      const data = await response.json();

      setFormData((prevData) => ({
        ...prevData,
        price: data.payload.total_price,
      }));
    } catch (error) {
      console.error("Failed to fetch price", error);
    }
  };

  const fetchLocationSuggestions = async (query: string, type: string) => {
    try {
      const response = await fetch(
        `https://liyt-api-849543905413.europe-west1.run.app/location/${query}`
      );
      const data = await response.json();
      if (type === "primary") {
        if (data.payload.data && data.payload.data.length > 0) {
        } else {
          alert(
            "The location you are trying to set does not exist. Please try again."
          ); // Show alert
        }
      } else {
        if (data.payload.data && data.payload.data.length > 0) {
          setDropOff(data.payload.data);
        } else {
          setDropOff([]); // Clear dropOff if no data
          alert(
            "The location you are trying to set does not exist. Please try again."
          ); // Show alert
        }
      }
    } catch (error) {
      console.error("Failed to fetch location suggestions", error);
    }
  };

  const handleRemoveItem = (uniqueId: string) => {
    dispatch(removeFromCart(uniqueId));
  };

  const handleUpdateQuantity = (uniqueId: string, quantity: number) => {
    dispatch(updateQuantity({ uniqueId, quantity }));
  };

  const handleLocationSelect = (
    location: any,
    type: "primary" | "secondary"
  ) => {
    const { latitude, longitude, name } = location;
    if (type === "primary") {
      setOriginLat(latitude);
      setOriginLon(longitude);
      if (destinationLat && destinationLon) {
        handlePriceCalculation(
          latitude,
          longitude,
          destinationLat,
          destinationLon
        );
      }
      setFormData((prevData) => ({
        ...prevData,
        origin: `${latitude},${longitude}`,
      }));
    } else {
      setDropOffInput(name);
      setDropOff([]);
      setDestinationLat(latitude);
      setDestinationLon(longitude);
      if (originLat && originLon) {
        handlePriceCalculation(originLat, originLon, latitude, longitude);
      }
      setFormData((prevData) => ({
        ...prevData,
        destination: `${latitude},${longitude}`,
      }));
    }
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
      // Step 1: Init order
      const initData = await orderInit(1).unwrap();
      console.log("Order init successful:", initData);

      if (!initData?.order_id) {
        throw new Error("Order initialization failed - no ID received");
      }

      // Step 2: Create delivery order
      const deliveryOrderResult = await createDeliveryOrder({
        id: initData.order_id,
        order: {
          destination: `${destinationLat},${destinationLon}`,
          destination_name: dropOffInput,
          customer_name: formData.customer_name,
          customer_phone_number: formData.customer_phone_number,
        },
      }).unwrap();
      console.log("Delivery order created:", deliveryOrderResult);

      // Step 3: Create actual order
      const orderResult = await creatOrder(orderPayload).unwrap();
      console.log("Final order created:", orderResult);

      // Success
      notifications.show({
        title: "Success",
        message: "Your order has been placed!",
        color: "green",
        icon: <HugeiconsIcon icon={Tick01Icon} />,
      });

      onClose();
      dispatch(clearCart());
    } catch (error) {
      console.error("Order error:", error);
      notifications.show({
        title: "Order Failed",
        message: "Something went wrong while placing the order.",
        color: "red",
        icon: <HugeiconsIcon icon={CheckUnread01Icon} />,
      });
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
            <div className="w-1/3">
              {/* <div className="mb-4">
                        <label className="block text-gray-700">Item:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Item"
                          onChange={handleChange}
                        />
                      </div> */}
              <Flex>
                <div className="mb-4">
                  {/* <label className="block text-gray-700">
                          Recipient name:
                        </label> */}
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    className="w-full p-2 border rounded"
                    placeholder="Recipient name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  {/* <label className="block text-gray-700">
                          Recipient name:
                        </label> */}
                  <input
                    type="text"
                    name="customer_phone_number"
                    value={formData.customer_phone_number}
                    className="w-full p-2 border rounded"
                    placeholder="Recipient phone number"
                    onChange={handleChange}
                  />
                </div>
              </Flex>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Drop Of Address"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={dropOffInput}
                  onChange={(e) => setDropOffInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    fetchLocationSuggestions(dropOffInput, "secondary")
                  }
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <HugeiconsIcon icon={Tick01Icon} />
                </button>
                {dropOff.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                    {dropOff.map((location: any, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleLocationSelect(location, "secondary")
                        }
                      >
                        {location.name} - {location.City},{location.Country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
