import {View , Text} from 'react-native';
import {Link} from 'expo-router';
const index = () => {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor: "black"}}>
      <Text style={{color:"white",fontSize:50}}>Index</Text>
    </View>
  );
}
export default index;