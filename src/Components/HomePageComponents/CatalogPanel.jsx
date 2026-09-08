import axios from "axios";
import { Box, Button, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../baseurl";
import { saveTrip } from "../../checkoutCart";

export const CatalogPanel = ({ endpoint, title, fields }) => {
  const [items, setItems] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios.get(`${BASE_URL}/${endpoint}`).then((response) => setItems(response.data));
  }, [endpoint]);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>{title}</Heading>
      {items.length === 0 ? (
        <Text>No {title.toLowerCase()} available yet.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {items.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="md" p={4}>
              {item.image && <img src={item.image} alt={item.name || item.title} width="100%" />}
              <Heading size="sm" mt={2}>{item.name || item.title}</Heading>
              {fields.map((field) => <Text key={field}>{item[field]}</Text>)}
              <Button
                mt={3}
                colorScheme="blue"
                onClick={() => {
                  saveTrip({ ...item, tripType: title === "Packages" ? "package" : "thing" });
                  toast({ title: `${title.slice(0, -1)} added to cart`, status: "success", duration: 2500 });
                }}
              >
                Add to cart
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
