import React from 'react';
import { StyleSheet } from 'react-native';
import RoundButton from './RoundButton';
import * as DropdownMenu from 'zeego/dropdown-menu';

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={'ellipsis-horizontal'} text="More" />
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  );
};

const styles = StyleSheet.create({});

export default Dropdown;
