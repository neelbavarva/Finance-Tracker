import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';

export default function Profile() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState("")
    const [income, setIncome] = useState(0)
    const [savings, setSavings] = useState(0)
    const [targetToSave, setTargetToSave] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [thisMonthStatus, setThisMonthStatus] = useState("")
    const [_id, set_id] = useState("")

    // UPDATE links -2
    const fetchData = () => {
        fetch("http://6dafdc2fb092.ngrok.io/personDetails")
        .then(res=>res.json())
        .then(results=>{
            
            setData(results)
            setName(results[0].name)
            setIncome(results[0].income)
            setSavings(results[0].savings)
            setTargetToSave(results[0].targetToSave)
            setTotalExpenses(results[0].totalExpenses)
            setThisMonthStatus(results[0].thisMonthStatus)
            set_id(results[0]._id)
            
            console.log(results[0].name)
            setLoading(false)
        })
    }

    const updateData = () =>{
        fetch("http://6dafdc2fb092.ngrok.io/updatePerson",{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:_id,
                    name: name,
                    income: income,
                    savings: savings,
                    targetToSave: targetToSave,
                    thisMonthStatus: thisMonthStatus,
                    totalExpenses: totalExpenses
                })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${name} has been updated`)
            setViewMode("expense")
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }
    useEffect(()=>{
        fetchData()
    },[])

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        )
    }

    const [viewMode, setViewMode] = React.useState("expense");

    function renderExpense() {

        const property = [ "Monthly Income", "Expenses", "Target to save", "This month's status", "Edit Values" ];
        const vals = [ `${income} USD`, `${totalExpenses} USD`, `${targetToSave} USD`, `Over Spent  (${thisMonthStatus})`];
        return (
            <View style={{ marginTop: 6 }} >
                {property.map((p) => {
                    return (
                        <TouchableOpacity
                            key={property.indexOf(p)}
                            style={{
                                flexDirection: 'row',
                                height: 60,
                                paddingHorizontal: 12,
                                marginTop: 14,
                                marginHorizontal: 18,
                                borderRadius: 10,
                                backgroundColor: "white",
                            }}
                            onPress={() => {
                                if(p==="Edit Values") setViewMode("edit"); 
                                console.log(p+" is pressed!");
                            }}
                        >
                            {/* Name/Category */}
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, color: "#194868"}}>{p}</Text>
                            </View>

                            {/* Expenses */}
                            <View style={{ justifyContent: 'center' }}>
                                {(p==="Edit Values") ? (
                                    <Image style={{width: 20, height:20}}source={require('../assets/icons/right-arrow.png')} />
                                ) : (
                                    <Text style={ (p==="This month's status") ? ((thisMonthStatus>=0)?{ color: "#00CC00"}:{ color: "red"}): { color: "#194868" }}>{vals[property.indexOf(p)]}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    function renderEdit() {
        return (
            <View>
            
            <View style={styles.container} >
            <KeyboardAvoidingView behavior="position">
            <Text style={styles.Text}>My Name</Text>
            <TextInput 
                style={styles.inputField}
                value={name}
                onChangeText={text => setName(text)}
            />

            <Text style={styles.Text}>Monthly Income</Text>
            <TextInput 
                style={styles.inputField}
                value={income.toString()}
                onChangeText={text => setIncome(parseInt(text))}
            />

            <Text style={styles.Text}>Target to save</Text>
            <TextInput 
                style={styles.inputField}
                value={targetToSave.toString()}
                onChangeText={text => setTargetToSave(parseInt(text))}
            />
            </KeyboardAvoidingView>
            {/* <Text style={styles.Text}>Extra expense this month</Text>
            <TextInput 
                style={styles.inputField}
            /> */}
            
            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => updateData()}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Save Changes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => setViewMode("expense")}
            >
                <View style={{
                        backgroundColor: "white",
                        padding: 12,
                        borderRadius: 6,
                        marginTop: 20
                    }}>
                    <Text style={{color: "black", textAlign: "center"}}>Cancel</Text>
                </View>
            </TouchableOpacity>
        </View>
            </View>
        )
    }

    return (

        <View>
            <FlatList
            data={data[0]}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            />
            <KeyboardAvoidingView behavior="position">
            <View style={styles.header}>
                <Image 
                    source={require('../assets/icons/profile.jpg')} 
                    style={{width: 100, height: 100, borderRadius: 1000}}
                />
                <Text style={{paddingTop: 10, fontSize: 16, lineHeight: 22}}>
                    {name}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "#F5F7F9" }}>

            <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "expense" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
                    }}
                    onPress={() => setViewMode("expense")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/salary.png')} />
                    </View>
                </TouchableOpacity>

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "edit" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
                    }}

                    // OVER HERE
                    onPress={() => setViewMode("edit")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/pages.png')} />
                    </View>
                </TouchableOpacity>
                </View>
                {
                    viewMode == "expense" &&
                    <View>
                        {renderExpense()}
                    </View>
                }
                {
                    viewMode == "edit" && 
                    <View>
                        {renderEdit()}
                    </View>
                }
                </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 5,
    }, 
    header : {
       padding : 50,
       backgroundColor: '#d1d0cd',
       alignItems: 'center', 
       justifyContent: 'center',
    },
        inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
    },

    Text : {
        fontSize: 14,
        color: "black",
        paddingTop: 8,
    },

    button : {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        marginTop: 20
    }
});


