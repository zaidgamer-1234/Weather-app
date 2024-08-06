import {
  ChakraProvider,
  Box,
  Flex,
  Input,
  Heading,
  Text,
  Stack,
  Image,
  VStack,
  Divider,
  theme,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";
import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = useCallback(async () => {
    if (city.trim() === "") return;

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setCityNotFound(false);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCityNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [city, apiKey]);

  useEffect(() => {
    const handlePress = (e) => {
      if (e.key === "Enter") getWeather();
    };
    document.addEventListener("keypress", handlePress);

    return () => document.removeEventListener("keypress", handlePress);
  }, [getWeather]);

  const renderWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return <WiDaySunny size={50} />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return <WiCloudy size={50} />;
      case "shower rain":
      case "rain":
      case "thunderstorm":
        return <WiRain size={50} />;
      default:
        return <WiCloudy size={50} />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        bgImage="url('https://img.freepik.com/free-vector/cloud-background-pastel-paper-cut-design-vector_53876-135919.jpg')"
        bgSize="cover"
        bgPos="center"
        minH="100vh"
        justify="center"
        align="center"
        p={4}
        w="100vw"
      >
        <Box
          opacity="0.8"
          backgroundColor="lightcyan"
          w="100%"
          maxW="700px"
          borderRadius="20px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)"
        >
          <Header />
          <Box p={6}>
            <Input
              style={{ border: "2px solid #000" }}
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              mb={6}
              size="lg"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
            />
            {cityNotFound && <Error />}

            {isLoading ? (
              <Loader />
            ) : (
              weather && (
                <VStack spacing={4}>
                  <Box p={4} w="100%">
                    <Flex justify="space-between" w="100%">
                      <Heading size="lg" fontFamily="Georgia, serif">
                        City: {weather.name}
                      </Heading>
                      <Heading size="lg" fontFamily="Georgia, serif">
                        Country: {weather.sys.country}
                      </Heading>
                    </Flex>
                  </Box>
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                  <Text
                    fontSize="2xl"
                    fontFamily="Courier New, monospace"
                    fontWeight="500"
                  >
                    {weather.main.temp}°C
                  </Text>
                  <Flex align="center">
                    {renderWeatherIcon(weather.weather[0].description)}
                    <Text ml={2} fontFamily="Verdana, sans-serif">
                      {weather.weather[0].description}
                    </Text>
                  </Flex>
                  <Divider />
                  <Stack direction="row" spacing={4} justify="center">
                    <Box textAlign="center">
                      <FaTemperatureHigh size={30} />
                      <Text fontFamily="Tahoma, sans-serif">Max Temp</Text>
                      <Text fontWeight="bold">{weather.main.temp_max}°C</Text>
                    </Box>
                    <Box textAlign="center">
                      <FaTemperatureLow size={30} />
                      <Text fontFamily="Tahoma, sans-serif">Min Temp</Text>
                      <Text fontWeight="bold">{weather.main.temp_min}°C</Text>
                    </Box>
                  </Stack>
                </VStack>
              )
            )}
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
