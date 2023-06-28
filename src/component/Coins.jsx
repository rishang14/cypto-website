import axios from 'axios';
import { server } from '../index';
import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import Loader from './Loader';
import HandlingError from './HandlingError';
import { Link } from 'react-router-dom';
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currnecy, setCurrency] = useState('inr');
  const changePage = page => {
    setPage(page);
    setloading(true);
  };
  const btns = new Array(132).fill(1);

  const currnecySymbol =
    currnecy === 'inr' ? '₹' : currnecy === 'eur' ? '€' : '$';
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currnecy}&page=${page}`
        );
        setCoins(data);
        setloading(false); 
    
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchCoins();
  }, [currnecy, page]);
  if (error) {
    return <HandlingError msg={'Error while fetching Coins'} />;
  }
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currnecy} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>₹ INR</Radio>
              <Radio value={'eur'}>€ EUR</Radio>
              <Radio value={'usd'}>$ USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {coins.map((coin) => {
              return (
                <CoinCard
                  id={coin.id}
                  key={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  img={coin.image}
                  price={coin.current_price}
                  currnecySymbol={currnecySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={'8'}>
            <Text>Next page</Text>
            {btns.map((item, index) => {
              return (
                <>
                  <Button
                    key={index}
                    onClick={() => changePage(index + 1)}
                    bgColor={'blackAlpha.900'}
                    color={'white'}
                  >
                    {index + 1}
                  </Button>
                </>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
const CoinCard = ({ id, name, currnecySymbol = '₹', symbol, price, img }) => {
  return ( <>
    <Link to={`/coins/${id}`} key={id}>
      <VStack
        w={'52'}
        shadow={'lg'}
        p={'8'}
        borderRadius={'lg'}
        transition={'all 0.3s'}
        m={'4'}
        css={{
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Image
          src={img}
          w={'10'}
          h={'10'}
          objectFit={'contain'}
          alt="excanges"
        />
        <Heading size={'md'} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price ? `${currnecySymbol}${price}` : 'NA'}</Text>
      </VStack>
    </Link>
  </>
  );
};
