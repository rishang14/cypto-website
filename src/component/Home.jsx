import { Box, Image, Text } from '@chakra-ui/react'; 
import {motion} from "framer-motion"
import Img from '../assets/btc.png';
const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
   <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={Img}
          filter={"grayscale(1)"}
        />
      </motion.div>
      <Text fontSize={'6xl'} textAlign={'center'} mt={'-20'} fontWeight={"thin"} color={"whiteAlpha.900"}>
        X-CRYPTo
      </Text>
    </Box>
  );
};
export default Home;
