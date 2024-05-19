import Dropdown from '@/components/Dropdown';
import RoundButton from '@/components/RoundButton';
import Colors from '@/constants/Colors';
import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const Page = () => {
  const balance = 7000;

  const onAddMoney = () => {};

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>R$</Text>
          <Text style={styles.balance}>{balance}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={'add'} text="Add money" onPress={onAddMoney} />
        <RoundButton icon={'refresh'} text="Exchange" />
        <RoundButton icon={'list'} text="Details" />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default Page;
