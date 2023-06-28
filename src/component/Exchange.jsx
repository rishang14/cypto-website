import axios from 'axios';
import { server } from '../index';
import { useEffect, useState } from 'react';
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Loader from './Loader';
import HandlingError from './HandlingError';
const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setloading(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchExchange();
  }, []);
  if (error) {
    return <HandlingError msg={'Error while fetching Exchanges'} />;
  }
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {exchanges.map(i => {
              return (
                <ExchangeCard
                  id={i.id}
                  name={i.name}
                  url={i.url}
                  rank={i.trust_score_rank}
                  img={i.image}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Exchange;

const ExchangeCard = ({ id, name, url, rank, img }) => {
  return (
    <a href={url} target="blank" key={id}>
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};
