import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { TbBed } from "react-icons/tb";
import { BsCheck } from "react-icons/bs";
import { IoIosMan } from "react-icons/io";
import { AiOutlineWifi } from "react-icons/ai";
import { getSavedTrips, removeTrip, saveTrip } from "../checkoutCart";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const pageBackground = useColorModeValue("gray.300", "gray.800");
  const cardBackground = useColorModeValue("white", "gray.700");
  const cardText = useColorModeValue("gray.800", "white");
  const mutedText = useColorModeValue("gray.600", "gray.200");
  const successText = useColorModeValue("green.600", "green.300");
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState(null);
  const [guest, setGuest] = useState({
    firstName: "",
    surname: "",
    mobile: "",
  });
  const [payment, setPayment] = useState({ name: "", card: "", security: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedTrips = getSavedTrips();
    setTrips(savedTrips);
    setTrip(savedTrips[0] || null);
  }, []);

  const updateGuest = (event) => {
    setGuest({ ...guest, [event.target.name]: event.target.value });
  };

  const updatePayment = (event) => {
    setPayment({ ...payment, [event.target.name]: event.target.value });
  };

  const saveForLater = () => {
    if (!trip) return;
    const savedTrip = saveTrip({ ...trip, guest, payment });
    setTrips(getSavedTrips());
    setTrip(savedTrip);
    setMessage("Trip saved. You can return here later to pay.");
  };

  const completeBooking = () => {
    if (!trip) {
      setMessage("Add a trip before completing your booking.");
      return;
    }
    const confirmation = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    removeTrip(trip.cartId);
    setTrips(getSavedTrips());
    setTrip(null);
    setMessage(
      `Booking confirmed with confirmation number ${confirmation} send your email.`,
    );
    navigate("/");
  };

  const selectTrip = (selectedTrip) => {
    setTrip(selectedTrip);
    setGuest(selectedTrip.guest || { firstName: "", surname: "", mobile: "" });
    setPayment(selectedTrip.payment || { name: "", card: "", security: "" });
    setMessage("");
  };

  const tripName = trip?.name || trip?.title || "Saved trip";
  const tripPrice = Number.parseFloat(
    String(trip?.price || "0").replace(/[^0-9.]/g, ""),
  ) || 0;
  const tripDetails = trip?.tripType === "flight"
    ? `${trip.from || "Departure"} to ${trip.to || "Arrival"} | ${trip.airline || "Flight"}`
    : trip?.tripType === "car"
      ? `${trip.type || "Car rental"} | ${trip.price || "Price on request"}`
      : trip?.place
        ? `${trip.place} | ${trip.price || "Price on request"}`
        : trip?.description || trip?.type || "Saved for later";

  return (
    <Box bg={pageBackground} color={cardText} width={"100%"} minHeight={"100vh"}>
      <Box width={"85%"} margin={"auto"}>
        <Heading fontSize={"26px"} fontWeight={"bold"} textAlign={"left"}>
          Review and Book
        </Heading>
        {message && (
          <Text color={successText} fontWeight="bold">
            {message}
          </Text>
        )}
        {trips.length > 1 && (
          <Box bg={cardBackground} mt={2} p={3}>
            <Text fontWeight="bold">Saved trips</Text>
            {trips.map((savedTrip) => (
              <Button
                key={savedTrip.cartId}
                size="sm"
                mr={2}
                mt={2}
                variant={
                  trip?.cartId === savedTrip.cartId ? "solid" : "outline"
                }
                onClick={() => selectTrip(savedTrip)}
              >
                {savedTrip.tripType === "flight"
                  ? `${savedTrip.from} to ${savedTrip.to}`
                  : "Saved trip"}
              </Button>
            ))}
          </Box>
        )}

        {!trip && (
          <Box bg={cardBackground} mt={2} p={4}>
            <Text fontWeight="bold">Your saved cart is empty.</Text>
            <Text color={mutedText}>Add a flight, car, package, or activity to your cart before checking out.</Text>
          </Box>
        )}

        {trip && <Box bg={cardBackground} mt={2} p={3}>
          <HStack>
            <Box>
              {trip.image && <Image src={trip.image} alt={tripName} maxH="120px" />}
            </Box>
            <Box>
              <Text textAlign={"left"} fontWeight={"bold"}>
                {tripName}
              </Text>
              <Text color={mutedText}>
                {tripDetails}
              </Text>
              <Text color={mutedText}>Cart item: {trip.tripType || "trip"}</Text>
            </Box>
          </HStack>
        </Box>}

        <SimpleGrid mt={2} gridTemplateColumns={"63% 35%"} gap={"1%"}>
          <Box bg={cardBackground} p={3}>
            <Heading textAlign={"left"} fontSize={"20px"} fontWeight={"bold"}>
              Whos Checking
            </Heading>
            <Heading textAlign={"left"} mt={3} fontWeight={"semibold"}>
              {trip ? `Reviewing ${tripName}` : "Select a saved trip to continue"}
            </Heading>
            <Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  First Name :{" "}
                  <Input
                    name="firstName"
                    value={guest.firstName}
                    onChange={updateGuest}
                    type="text"
                    placeholder="First Name"
                    border="1px solid gray"
                  />
                </label>
              </Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  Surname Name :{" "}
                  <Input
                    name="surname"
                    value={guest.surname}
                    onChange={updateGuest}
                    type="text"
                    placeholder="Surname"
                    border="1px solid gray"
                  />
                </label>
              </Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  Mobile No :{" "}
                  <Input
                    name="mobile"
                    value={guest.mobile}
                    onChange={updateGuest}
                    type="text"
                    placeholder="Mobile No"
                    border="1px solid gray"
                  />
                </label>
              </Box>
            </Box>

            <Box textAlign={"left"} display={"flex"}>
              <Input type="checkbox" />
              <Heading ml={2}>
                Receive text alerts about this trip (free of charge).
              </Heading>
            </Box>
          </Box>

          <Box bg={cardBackground} textAlign={"left"} p={2}>
          {trip?.image && <Image mb={1} width={"100%"} maxH="220px" objectFit="cover" src={trip.image} alt={tripName} />}
          <Heading fontSize={"18px"}>{tripName}</Heading>
          <Text color={mutedText}>{tripDetails}</Text>

            <SimpleGrid gridTemplateColumns={"repeat(2,1fr)"} mt={3} mb={5}>
              <Box>
                <Icon as={TbBed} fontSize={"18px"} /> {trip?.tripType === "car" ? "Rental vehicle" : "Trip item"}
              </Box>
              <Box>
                <Icon as={IoIosMan} fontSize={"18px"} /> {trip?.tripType === "flight" ? `${trip.passenger || 1} traveler(s)` : "Flexible booking"}
              </Box>
              <Box>
                <Icon as={AiOutlineWifi} fontSize={"18px"} /> Saved in cart
              </Box>
              <Box>
                <Icon as={BsCheck} fontSize={"18px"} /> Fake checkout
              </Box>
            </SimpleGrid>
          </Box>
        </SimpleGrid>

        <SimpleGrid mt={2} gridTemplateColumns={"63% 35%"} gap={"1%"}>
          <Box bg={cardBackground} p={3}>
            <Heading textAlign={"left"} fontSize={"20px"} fontWeight={"bold"}>
              Payment Method
            </Heading>
            <Heading textAlign={"left"} mt={3} fontWeight={"semibold"}>
              ₹0.00 due now. Payment information is only needed to hold your
              reservation.
            </Heading>

            <Box display={"flex"} gap={"6px"}>
              <Image
                height={"30px"}
                width={"30px"}
                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_american_express.svg"
                alt="image"
              />
              <Image
                height={"30px"}
                width={"30px"}
                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_master_card.svg"
                alt="image"
              />
              <Image
                height={"30px"}
                width={"30px"}
                src="https://a.travel-assets.com/egds/marks/payment__visa.svg"
                alt="image"
              />
              <Image
                height={"30px"}
                width={"30px"}
                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_visa_electron.svg"
                alt="image"
              />
            </Box>
            <Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  <b>Name on Card</b> :{" "}
                  <Input
                    name="name"
                    value={payment.name}
                    onChange={updatePayment}
                    type="text"
                    placeholder="Name on card"
                    border="1px solid gray"
                  />
                </label>
              </Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  <b>Debit/Credit card number : </b>{" "}
                  <Input
                    name="card"
                    value={payment.card}
                    onChange={updatePayment}
                    type="text"
                    placeholder="Card number"
                    border="1px solid gray"
                  />
                </label>
              </Box>
              <Box textAlign={"left"} my={2}>
                <label>
                  <b>Security code :</b>{" "}
                  <Input
                    name="security"
                    value={payment.security}
                    onChange={updatePayment}
                    type="text"
                    placeholder="Security code"
                    border="1px solid gray"
                  />
                </label>
              </Box>
            </Box>

            <Box textAlign={"left"} display={"flex"}>
              <Input type="checkbox" />
              <Heading ml={2}>
                Receive text alerts about this trip (free of charge).
              </Heading>
            </Box>
          </Box>

          <Box bg={cardBackground} textAlign={"left"} p={4}>
            {/* <Image mb={1} width={'100%'} src='https://images.trvl-media.com/lodging/4000000/3450000/3447500/3447485/4c0514cb_l.jpg' />
              <Heading fontSize={'13px'} >8.8/10 Excellent (820 reviews)</Heading>
              <Heading fontSize={'13px'}>Guests rated this property 9/10 for cleanliness</Heading>
              <Heading fontSize={'13px'}>1 Room: Room, 2 Twin Beds, Non Smoking, City View</Heading> */}
            <Box justifyContent={"space-between"} display={"flex"}>
              <Box>{tripName}</Box>
              <Box>{trip?.price || "$0.00"}</Box>
            </Box>

            <Box justifyContent={"space-between"} display={"flex"}>
              <Box>Taxes</Box>
              <Box>${(tripPrice * 0.18).toFixed(2)}</Box>
            </Box>

            <Box
              justifyContent={"space-between"}
              display={"flex"}
              fontWeight={"bold"}
            >
              <Box>Total</Box>
              <Box>${(tripPrice * 1.18).toFixed(2)}</Box>
            </Box>

            <Box
              justifyContent={"space-between"}
              display={"flex"}
              color="green.600"
            >
              <Box>Pay Now</Box>
              <Box>$0.00</Box>
            </Box>

            <Box justifyContent={"space-between"} display={"flex"}>
              <Box>Pay at property</Box>
              <Box>${(tripPrice * 1.18).toFixed(2)}</Box>
            </Box>
            <Button
              mt={4}
              width={"100%"}
              height="40px"
              bg={"gray.500"}
              rounded={"7px"}
              onClick={saveForLater}
            >
              Save trip for later
            </Button>
            <Button
              mt={2}
              width={"100%"}
              height="40px"
              bg={"#FF9800"}
              rounded={"7px"}
              onClick={completeBooking}
            >
              Complete Booking
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
