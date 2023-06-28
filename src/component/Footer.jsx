import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react"

const Footer=()=> {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.900"} minH={"48"} px={"16"} py={["16","8"]}>
 <Stack alignItems={"center"} direction={["column","row"]} h={"full"}>
<VStack alignItems={["center","flex-start"]} w={"full"}> 
<Text fontWeight={"bold"}>About us</Text> 
<Text letterSpacing={"xs"} textAlign={["center","left"]}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, natus.</Text>
    
</VStack>
<VStack>
<Avatar boxSize={"28"} mt={["4","0"]}/> 
<Text>Our founder</Text>
</VStack>
 </Stack>
    </Box>
  )
}

export default Footer;