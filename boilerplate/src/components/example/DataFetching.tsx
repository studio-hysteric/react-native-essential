import React from 'react';
import useSWR from 'swr';
import fetcher from '@/shared/services';
import { Box } from '../box';
import { Text } from '../text';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { radius, screenWidth } from '@/shared/theme';
import { Button } from '../button';

const DataFetching = () => {
  const {
    data: users,
    isValidating,
    error,
    mutate,
  } = useSWR('getUsers', fetcher.user.getUsers);

  if (!users || error) {
    return null;
  }

  return (
    <Box width={'100%'} padding={15}>
      {isValidating ? (
        <ActivityIndicator />
      ) : (
        <Box.Row flexWrap="wrap" gap={10}>
          {users.data.map((user) => (
            <Box key={user.id} width={(screenWidth - 60) / 4} gap={5} center>
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <Text>{user.first_name}</Text>
            </Box>
          ))}
        </Box.Row>
      )}
      <Button
        wFull
        onPress={() => mutate()}
        mt={20}
        rounded={'full'}
        $textProps={{ t: 'actions.refetch' }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.full,
  },
});

export default DataFetching;
