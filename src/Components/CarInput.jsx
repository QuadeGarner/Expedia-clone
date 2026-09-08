import { Box, Button, Input, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../baseurl";
import { saveTrip } from "../checkoutCart";

export const CarInput = () => {
  const [cars, setCars] = useState([]);
  const toast = useToast();
  useEffect(() => {
    axios.get(`${BASE_URL}/cars`).then((response) => setCars(response.data));
  }, []);
  return (
    <Box>
      <Input placeholder='Pick up location' size='md' mb={2} />
      <Input placeholder='Drop off location' size='md' mb={4} />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
        {cars.map((car) => (
          <Box key={car.id} borderWidth="1px" p={3} borderRadius="md">
            {car.image && <img src={car.image} alt={car.name} width="100%" />}
            <Text fontWeight="bold">{car.name}</Text>
            <Text>{car.type}</Text>
            <Text>{car.price}</Text>
            <Button
              mt={2}
              colorScheme="blue"
              onClick={() => {
                saveTrip({ ...car, tripType: "car" });
                toast({ title: "Car added to cart", status: "success", duration: 2500 });
              }}
            >
              Add to cart
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
