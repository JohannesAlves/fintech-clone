import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await fetch(`/api/info`).then((res) => res.json());
      return id && info?.data[+id];
    },
    enabled: !!id,
  });

  const { data: tickers } = useQuery({
    queryKey: ['tickers'],
    queryFn: async () => fetch(`/api/tickers`).then((res) => res.json()),
  });

  return (
    <>
      <SectionList
        style={{ paddingTop: headerHeight }}
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: 'Chart' }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            style={{ flex: 1, height: 50 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                key={category}
                onPress={() => setActiveIndex(index)}
              >
                <Text
                  style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Image source={{ uri: data?.logo }} style={{ width: 40, height: 40 }} />
              <Text style={styles.subtitle}>{data?.symbol}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, margin: 12, justifyContent: 'center' }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
                ]}
              >
                <Ionicons name="add" size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={{ height: 500, backgroundColor: 'red' }}></View>

            <View style={defaultStyles.block}>
              <Text style={[styles.subtitle, { color: Colors.dark }]}>Overview</Text>
              <Text style={{ color: Colors.gray }}>{data?.description}</Text>
            </View>
          </>
        )}
      ></SectionList>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default Page;
