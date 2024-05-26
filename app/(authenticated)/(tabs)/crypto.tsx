import { ICurrency } from '@/interfaces/crypto';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Page = () => {
  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: (): Promise<{ data: ICurrency[] }> => fetch('/api/listings').then((res) => res.json()),
  });

  const ids = currencies.data?.data?.map((currency) => currency.id).join(',');

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <View>
      {currencies?.data?.data?.map((currency) => (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: data?.data[currency.id]?.logo }}
            style={{ width: 30, height: 30 }}
          />
          <Text key={currency.id}>{currency.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Page;
