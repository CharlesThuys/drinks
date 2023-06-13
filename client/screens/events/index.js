import { ApplicationProvider, Layout, Text, useTheme } from '@ui-kitten/components';

const Events = () => {
  const theme = useTheme();

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Events</Text>
    </Layout>
  )
}

export default Events