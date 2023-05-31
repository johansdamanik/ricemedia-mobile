import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params;

  const GET_POST_BY_ID = gql`
    query FindPostById($findPostByIdId: ID!) {
      findPostById(id: $findPostByIdId) {
        id
        title
        content
        imgUrl
        createdAt
        tags {
          name
        }
        User {
          username
          email
        }
        Category {
          name
        }
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      findPostByIdId: id,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Error bang</Text>
      </View>
    );
  }

  const post = data.findPostById;

  const createdAt = new Date(post.createdAt);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(createdAt);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/blackrice.png')} style={styles.logo} />
            </View>
            <TouchableOpacity>
              <Entypo name="share-alternative" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.contentContainer}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentCategory}>{post.Category.name}</Text>
                <Text style={styles.contentTitle}>{post.title}</Text>
                <View style={{ width: '100%', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}></View>
                <Text style={styles.contentAuthor}>
                  By <Text style={{ textDecorationLine: 'underline' }}>{post.User.username || post.User.email}</Text>
                </Text>
                <Text style={styles.contentDate}>{formattedDate}</Text>
              </View>
            </View>
            <Image source={{ uri: post.imgUrl }} style={styles.image} />
            <Text style={styles.content} >{post.content}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  card: {
    flex: 1,
    marginTop: 18,
    backgroundColor: 'white',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    overflow: 'hidden',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 25,
    width: 80,
  },
  contentContainer: {
    padding: 12,
    width: '100%',
  },
  contentCategory: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: 12,
    marginBottom: 8,
  },
  contentAuthor: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingVertical: 12,
  },
  contentDate: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  image: {
    height: 200,
    flex: 1,
    width: '100%',
    marginBottom: 12
  },
  content: {
    padding: 12,
    fontFamily : 'serif',
    lineHeight: 26,
    color: 'black'
  }
});
