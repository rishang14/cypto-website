import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import HandlingError from './HandlingError';
import { server } from '../index';
import Chart from './Chart';
const CoinsDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [currnecy, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  const param = useParams();
  const currnecySymbol =
    currnecy === 'inr' ? '₹' : currnecy === 'eur' ? '€' : '$';
  const btns = ['24h', '7d', '15d', '60d', '100d', '1yr', 'max'];
  const switchChartStats = key => {
    switch (key) {
      case '24h':
        setDays('24h');
        setloading(true);
        break;
      case '7d':
        setDays('7d');
        setloading(true);
        break;
      case '15d':
        setDays('15d');
        setloading(true);
        break;
      case '60d':
        setDays('60d');
        setloading(true);
        break;
      case '100d':
        setDays('100d');
        setloading(true);
        break;
      case '1yr':
        setDays('365d');
        setloading(true);
        break;
      case 'max':
        setDays('max');
        setloading(true);
        break;

      default:setDays('24h');
      setloading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${param.id}/market_chart?vs_currency=${currnecy}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setloading(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchCoins();
  }, [param.id, currnecy, days]);
  if (error) return <HandlingError msg={'Error while fetching coins'} />;
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'full'} borderWidth={'1'}>
            <Chart currency={currnecySymbol} arr={chartArray} days={days} />
          </Box>
          <HStack p={'4'} overflowX={"auto"}>
            {btns.map(i => {
              return (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              );
            })}
          </HStack>
          <RadioGroup value={currnecy} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>₹ INR</Radio>
              <Radio value={'eur'}>€ EUR</Radio>
              <Radio value={'usd'}>$ USD</Radio>
            </HStack>
          </RadioGroup>
          <VStack p={'16'} alignItems={'flex-start'} spacing={'4'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              last Updated on{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              h={'16'}
              w={'16'}
              objectFit={'cointain'}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currnecySymbol}
                {coin.market_data.current_price[currnecy]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={'2xl'}
              bgColor={'blackAlpha.800'}
              color={'white'}
            >{`#${coin.market_cap_rank}`}</Badge>
            <CustomBar
              high={`${currnecySymbol}${coin.market_data.high_24h[currnecy]}`}
              low={`${currnecySymbol}${coin.market_data.low_24h[currnecy]}`}
            />
            <Box w={'full'} p={'4'}>
              <Item title={'Max supply'} value={coin.market_data.max_supply} />
              <Item
                title={'Circulating supply'}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={'Market cap'}
                value={`${currnecySymbol}${coin.market_data.market_cap[currnecy]}`}
              />
              <Item
                title={'All time low'}
                value={`${currnecySymbol}${coin.market_data.atl[currnecy]}`}
              />
              <Item
                title={'All time high'}
                value={`${currnecySymbol}${coin.market_data.ath[currnecy]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const CustomBar = ({ high, low }) => {
  return (
    <VStack w={'full'}>
      <Progress value={'50'} colorScheme="teal" w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={'xs'}>24H range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};
const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text font-family={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};
export default CoinsDetails;
