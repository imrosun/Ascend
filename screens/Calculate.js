import React, { Component } from 'react';
import {
      View,
      Text,
      TouchableOpacity,
      TextInput,
      StyleSheet,
    } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
    
    class UploadText extends Component {
     state = {
        height: '',
        weight: '',
        bmi: '',
        BmiResult: '',
        heightOpen: false,
        heightValue: null,
        heightItems : [
          {label: 'Addition', value: 1},
          {label: 'Subtraction', value: 2},
          {label: 'Multiplication', value: 3},
        ],
      };

      setHeightOpen = (heightOpen) => {
        this.setState({
          heightOpen,
          weightOpen: false
        });
      }

      setHeightValue = (callback) => {
        this.setState(state => ({
          heightValue: callback(state.heightValue),
        }));
      }
      
      setHeightItems = (callback) => {
        this.setState(state => ({
          heightItems: callback(state.heightItems)
        }));
      }

      handleHeight = (text) => {
        this.setState({ height: text });
      };
      handleWeight = (text) => {
        this.setState({ weight: text });  
      };
      calculate = (height, weight) => {
        var result1 = (parseFloat(height)) + (parseFloat(weight))
        var result2 = (parseFloat(height)) - (parseFloat(weight))
        var result3 = (parseFloat(height)) * (parseFloat(weight)) 

        var error = ("Fields are empty")

        if(this.state.heightValue === 1){
          this.setState({ bmi: result1 });
        }        
        else if(this.state.heightValue === 2){
          this.setState({ bmi: result2 });   
        }
        else if(this.state.heightValue === 3){
          this.setState({ bmi: result3 });
        }
        else{
         this.setState({bmi: error});
        }
      }     
      
    render() {
    
        return (
          <View style={styles.container}>                  
            <TextInput
              disabled={ this.state.heightValue == null ? true : false}
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
              autoCapitalize="none"
              onChangeText={this.handleHeight}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
              autoCapitalize="none"
              onChangeText={this.handleWeight}
            />
            <DropDownPicker
              placeholder={'Select Arithmetic Operation'}
              open={this.state.heightOpen}
              value={this.state.heightValue}
              // style={{...styles.dropDownStyle,
              //   flexDirection: 'row'}}
              style={
                { minWidth: '50%',
                  borderWidth: 1,
                  color: "#FFFFFF",
                  height: 40,
                  alignItems: "center",
                  borderRadius: 30,
                  marginLeft: 5,
                  marginRight: 10,
                  marginTop: 20,
                  marginBottom: 20,                 
                   }}
              items={this.state.heightItems}
              setOpen={this.setHeightOpen}
              setValue={this.setHeightValue}
              setItems={this.setHeightItems}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.calculate(this.state.height, this.state.weight)}>
                 <Text style={styles.submitButtonText}> Calculate </Text>
            </TouchableOpacity>

            <Text style={styles.output}>{this.state.bmi}</Text>
            {/* <Text style={styles.resultText}>{this.state.BmiResult}</Text> */}
          </View>
        );
      }
    }
    export default UploadText;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 10,
      },
      dropDownStyle: {
        margin: 15,
        height: 40,
        borderWidth: 1,        
        color: 'black',        
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 40,      
        borderRadius: 1,
        paddingHorizontal: 30,
        marginBottom: 30,        
      },
      input: {
        margin: 15,
        height: 40,
        borderWidth: 1,
        padding: 10,
        color: 'black',
     },
      
      submitButton: {
         minWidth: 300,
         backgroundColor: '#ff6666',
         borderWidth: 0,
         color: "#FFFFFF",
         height: 40,
         alignItems: "center",
         borderRadius: 30,
         marginLeft: 35,
         marginTop: 20,
         marginRight: 35,
         marginBottom: 25,
      //   backgroundColor: '#ff6666',
      //   padding: 10,
       
      //   height: 40,
      },
      submitButtonText: {
        textAlign: 'center',
        color: 'white',
        // fontWeight:"bold",
        fontSize: 16,
        paddingVertical: 10,
      },
      output: {
        textAlign: 'center',
        fontSize: 30,
        color: 'black'
      },
      title: {
        paddingTop: 30,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
      },
      resultText: {
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 30,
        color: 'blue',
      },
      label: {
        marginLeft: 15,
      },
    });