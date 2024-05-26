import { ICurrency } from '@/interfaces/crypto';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const headerHeight = useHeaderHeight();

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
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Cryptos</Text>
      <View style={defaultStyles.block}>
        {currencies?.data?.data?.map((currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
              <Image
                source={{ uri: data?.data[currency.id]?.logo }}
                style={{ width: 40, height: 40 }}
              />
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>

              <View style={{ gap: 6, alignItems: 'flex-end' }}>
                <Text>R${currency.quote.BRL.price.toFixed(2)}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <Ionicons
                    name={currency.quote.BRL.percent_change_1h > 0 ? 'caret-up' : 'caret-down'}
                    size={16}
                    color={currency.quote.BRL.percent_change_1h > 0 ? 'green' : 'red'}
                  />
                  <Text
                    style={{ color: currency.quote.BRL.percent_change_1h > 0 ? 'green' : 'red' }}
                  >
                    {currency.quote.BRL.percent_change_1h.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Page;
