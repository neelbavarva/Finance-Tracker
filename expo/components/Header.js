import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

export default function Header({ viewMode, NavbarButtonHandler }) {
    return (
        <View>
            <View style={styles.MainHeadingView}>
                <Text style={styles.MainHeadingText}>My Expenses</Text>

                {/* BUTTON FOR STACK NAVIGATION */}
                <TouchableOpacity style={{margin: 120, padding: 5, backgroundColor: "pink", marginTop: 150}}>
                        <Text>Profile</Text>
                </TouchableOpacity>

            </View>

            {<NavigationBar viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    MainHeadingView : {
        flex: 1, 
        flexDirection: 'row', 
        paddingHorizontal: 24, 
        alignItems: 'center', 
        marginTop: 60,
        marginRight: 24,
    },
    MainHeadingText : {
        fontSize: 22, 
        lineHeight: 30, 
        color: 'black', 
        fontWeight: 'bold', 
        marginLeft: 0,
        marginTop: 30,
    }   
});
